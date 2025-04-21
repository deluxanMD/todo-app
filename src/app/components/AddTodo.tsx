'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../lib/features/todos/todosSlice'
import { v4 as uuidv4 } from 'uuid'
import { RootState } from '../lib/store'
import Modal from './Modal'
import Select from './Select'
import Input from './Input'
import Button from './Button'
import TodoListItem from './TodoListItem'

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

type Priority = 'low' | 'medium' | 'high'

export default function AddTodo() {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('low')
  const [dependentTodos, setDependentTodos] = useState<string[]>([])
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddTodo = () => {
    if (title === '') return

    dispatch(
      addTodo({
        todo: {
          id: uuidv4(),
          title,
          completed: false,
          priority,
          createdDate: new Date().toISOString(),
          dependsOn: dependentTodos,
          recurring: {
            type: 'none',
            lastCreatedDate: new Date().toISOString(),
          },
        },
      })
    )

    setTitle('')
  }

  const handlePriority = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value as Priority)
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleTodoSelect = (
    _e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    if (!dependentTodos.includes(id)) {
      setDependentTodos((prev) => [...prev, id])
    } else {
      const filtered = dependentTodos.filter((todoId) => todoId !== id)
      setDependentTodos(filtered)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="mt-10">
      <div className="flex flex-row space-x-2">
        <Select options={priorityOptions} onChange={handlePriority} />
        <Input value={title} onChange={handleInput} />
        <Button title="Add" disabled={title === ''} onClick={handleAddTodo} />
      </div>
      <div className="mt-5">
        <Button
          title="Select Dependency"
          disabled={title === ''}
          onClick={openModal}
        />
      </div>
      <Modal
        title="Select Dependent Tasks"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {todos?.map((todo) => (
          <TodoListItem
            key={todo.id}
            dependentTodos={dependentTodos}
            todo={todo}
            onClick={handleTodoSelect}
          />
        ))}
      </Modal>
    </div>
  )
}
