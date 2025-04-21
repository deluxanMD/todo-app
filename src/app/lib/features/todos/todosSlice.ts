'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RecurringType, Todo } from './todo.types'
import { canCompleteTask, removeAvailableInDependency } from './todo.utils'

export interface TodoState {
  todos: Todo[]
  error: boolean
}

const initialState: TodoState = {
  todos: [],
  error: false,
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.todos = [...state.todos, action.payload.todo]
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)

      if (!!todo) {
        const canComplete = canCompleteTask(todo, state.todos)

        if (canComplete) {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload.id
          )
          state.todos = removeAvailableInDependency(
            action.payload.id,
            state.todos
          )
        } else {
          state.error = true
        }
      }
    },
    removeDependentTodo: (
      state,
      action: PayloadAction<{ id: string; depId: string }>
    ) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            dependsOn: todo.dependsOn.filter(
              (dId) => dId !== action.payload.depId
            ),
          }
        }

        return todo
      })
    },
    markAsCompleted: (state, action: PayloadAction<{ id: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id)

      if (!!todo) {
        const canComplete = canCompleteTask(todo, state.todos)

        if (canComplete) {
          state.todos = state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
              return {
                ...todo,
                completed: true,
              }
            }

            return todo
          })
        } else {
          state.error = true
        }
      }
    },
    sortingTodos: (
      state,
      action: PayloadAction<{ type: 'priority' | 'status' }>
    ) => {
      const priorityOrder = {
        low: 1,
        medium: 2,
        high: 3,
      }

      if (action.payload.type === 'priority') {
        state.todos = state.todos.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        )
      } else if (action.payload.type === 'status') {
        state.todos = state.todos.sort(
          (a, b) => Number(a.completed) - Number(b.completed)
        )
      }

      console.log(action.payload.type, state.todos)
    },
    setRecurring: (
      state,
      action: PayloadAction<{ id: string; recurringType: RecurringType }>
    ) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            recurring: {
              type: action.payload.recurringType,
              lastCreatedDate: todo.recurring.lastCreatedDate,
            },
          }
        }

        return todo
      })
    },
  },
})

export const {
  addTodo,
  removeTodo,
  removeDependentTodo,
  markAsCompleted,
  sortingTodos,
  setRecurring,
} = todoSlice.actions

export default todoSlice.reducer
