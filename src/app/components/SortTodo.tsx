'use client'
import { useDispatch } from 'react-redux'
import { sortingTodos } from '../lib/features/todos/todosSlice'
import { ChangeEvent } from 'react'
import Select from './Select'

const options = [
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
]

export default function SortTodo() {
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      sortingTodos({
        type: e.target.value.toLowerCase() as 'priority' | 'status',
      })
    )
  }

  return (
    <div className="flex flex-row space-x-2 mt-10 mb-5">
      <Select title="Sort By" options={options} onChange={handleChange} />
    </div>
  )
}
