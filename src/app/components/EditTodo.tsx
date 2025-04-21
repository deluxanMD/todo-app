'use client'
import { useDispatch, useSelector } from 'react-redux'
import { getTodoById } from '../lib/features/todos/todo.utils'
import { RootState } from '../lib/store'
import { useState } from 'react'
import Image from 'next/image'
import {
  removeDependentTodo,
  setRecurring,
} from '../lib/features/todos/todosSlice'
import { RecurringType } from '../lib/features/todos/todo.types'

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

  const handleDelete = (depId: string) => {
    dispatch(removeDependentTodo({ id, depId }))
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 text-center w-100">
        <h2 className="h2 uppercase font-extrabold text-4xl w-full">
          Edit Todo
        </h2>
        <div className="mt-10">
          <input
            className="border-1 rounded p-2 w-100"
            value={value?.title}
            onChange={handleChange}
          />
          {!!todo && todo?.dependsOn?.length > 0 && (
            <div className="mt-5 text-left">
              <h2 className="font-bold">Dependent Tasks</h2>
              {todo?.dependsOn?.map((depId) => (
                <div
                  key={depId}
                  className="flex flex-row items-center space-x-4"
                >
                  <p>{getTodoById(depId, todos)?.title}</p>
                  <Image
                    className="cursor-pointer"
                    src="/trash.svg"
                    alt="trash icon"
                    width={15}
                    height={15}
                    onClick={() => handleDelete(depId)}
                  />
                </div>
              ))}
            </div>
          )}
          <select
            title="Recurring"
            className="mt-5 text-left w-100 border-1 p-2 rounded"
            onChange={(e) =>
              dispatch(
                setRecurring({
                  id,
                  recurringType: e.target.value as RecurringType,
                })
              )
            }
          >
            <option value="">Select Recurring</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="w-100 bg-blue-400 p-2 rounded text-white cursor-pointer hover:bg-blue-500">
          Update
        </button>
      </div>
    </div>
  )
}
