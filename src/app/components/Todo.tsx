'use client'
import { useDispatch, useSelector } from 'react-redux'
import { Todo as TodoType } from '../lib/features/todos/todo.types'
import { useRouter } from 'next/navigation'
import { markAsCompleted, removeTodo } from '../lib/features/todos/todosSlice'
import { canCompleteTask } from '../lib/features/todos/todo.utils'
import { RootState } from '../lib/store'
import { useState } from 'react'
import Modal from './Modal'
import TodoListItem from './TodoListItem'
import PriorityIcon from './PriorityIcon'
import ActionIcons from './ActionIcons'
import TodoTitle from './TodoTitle'

export default function Todo({ todo }: { todo: TodoType }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const todos = useSelector((state: RootState) => state.todos.todos)

  const handleDelete = () => {
    const canDelete = canCompleteTask(todo, todos)

    if (!canDelete) {
      setModalOpen(true)
    }

    dispatch(removeTodo({ id: todo?.id }))
  }

  const handleComplete = () => {
    const canDelete = canCompleteTask(todo, todos)

    if (!canDelete) {
      setModalOpen(true)
    }

    dispatch(markAsCompleted({ id: todo?.id }))
  }

  return (
    <div className="mb-2 flex items-center justify-between p-2 rounded-md border-1 border-blue-300">
      <div className="flex space-x-2 items-center justify-between">
        <PriorityIcon priority={todo.priority} />
        <TodoTitle title={todo.title} completed={todo.completed} />
      </div>
      <div className="flex space-x-2 items-center justify-between">
        <ActionIcons
          completed={todo.completed}
          handleComplete={handleComplete}
          handleEdit={() => router.push(`/todo/${todo.id}`)}
          handleDelete={handleDelete}
        />
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Pending Todos"
      >
        {todo?.dependsOn?.map((depId) => (
          <TodoListItem key={depId} todo={todo} />
        ))}
      </Modal>
    </div>
  )
}
