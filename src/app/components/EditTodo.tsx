'use client'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoById } from '../lib/features/todos/todo.utils'
import { RootState } from '../lib/store'
import { useState } from 'react'
import {
  removeDependentTodo,
  setRecurring,
  updateTitle,
} from '../lib/features/todos/todosSlice'
import { RecurringType } from '../lib/features/todos/todo.types'
import Title from './Title'
import Input from './Input'
import DependencyListItem from './DependencyListItem'
import Select from './Select'
import Button from './Button'

const options = [
  { value: 'none', label: 'None' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

interface Props {
  id: string
}

export default function EditTodo({ id }: Props) {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const todo = getTodoById(id, todos)
  const [value, setValue] = useState(todo)
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      title: e.target.value ?? '',
      id: value?.id ?? '',
      completed: value?.completed ?? false,
      createdDate: value?.createdDate ?? '',
      dependsOn: value?.dependsOn ?? [],
      priority: value?.priority ?? 'low',
      recurring: {
        type: value?.recurring.type ?? 'none',
        lastCreatedDate: value?.recurring.lastCreatedDate ?? '',
      },
    })
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setRecurring({
        id,
        recurringType: e.target.value as RecurringType,
      })
    )
  }

  const handleUpdate = () => {
    dispatch(updateTitle({ id, title: value?.title ?? '' }))
  }

  const handleDelete = (depId: string) => {
    dispatch(removeDependentTodo({ id, depId }))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 text-center w-100">
        <Title>Edit Todo</Title>
        <div className="mt-10">
          <Input value={value?.title ?? ''} onChange={handleChange} />
          {!!todo && todo?.dependsOn?.length > 0 && (
            <div className="mt-5 text-left">
              <h2 className="font-bold">Dependent Tasks</h2>
              {todo?.dependsOn?.map((depId) => (
                <DependencyListItem
                  key={depId}
                  depId={depId}
                  todos={todos}
                  handleDelete={() => handleDelete(depId)}
                />
              ))}
            </div>
          )}
          <Select
            options={options}
            onChange={handleSelect}
            className="text-left mt-5"
            title="Recurring Type"
          />
        </div>
      </div>
      <div className="mt-5">
        <Button title="Update" onClick={handleUpdate} className="w-100" />
      </div>
    </div>
  )
}
