'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import Todo from '../components/Todo'
import AddTodo from '../components/AddTodo'
import SortTodo from '../components/SortTodo'
import { recurringTask } from '../lib/features/todos/todo.utils'
import { addTodo } from '../lib/features/todos/todosSlice'
import { v4 as uuidv4 } from 'uuid'
import Title from '../components/Title'

export default function Todos() {
  const todos = useSelector((state: RootState) => state.todos.todos)
  const dispatch = useDispatch()

  const processRecurringTasks = () => {
    todos.forEach((todo) => {
      if (todo.recurring && recurringTask(todo.recurring)) {
        dispatch(
          addTodo({
            todo: {
              title: todo.title,
              createdDate: new Date().toString(),
              completed: false,
              priority: 'low',
              dependsOn: [],
              id: uuidv4(),
              recurring: {
                type: todo.recurring.type,
                lastCreatedDate: todo.recurring.lastCreatedDate,
              },
            },
          })
        )
      }
    })
  }

  useEffect(() => {
    processRecurringTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, dispatch])

  return (
    <div className="flex items-center justify-center">
      <div className="mt-20 text-center w-100">
        <Title>Todo List</Title>
        <AddTodo />
        {todos?.length > 0 && <SortTodo />}
        {todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </div>
    </div>
  )
}
