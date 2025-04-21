'use client'

import { useDispatch } from 'react-redux'
import { sortingTodos } from '../lib/features/todos/todosSlice'
import { ChangeEvent } from 'react'

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
    <div className="flex flex-row space-x-2">
      <p>Sort By</p>
      <select title="Sort By" onChange={handleChange}>
        <option>Priority</option>
        <option>Status</option>
      </select>
    </div>
  )
}
