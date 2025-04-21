'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Todo } from './todo.types'

export interface TodoState {
  todos: Todo[]
}

const initialState: TodoState = {
  todos: [],
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{todo: Todo}>) => {
        state.todos = [...state.todos, action.payload.todo]
    },
    removeTodo: (state, action: PayloadAction<{id: string}>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    markAsCompleted: (state, action: PayloadAction<{id: string}>) => {
        state.todos = state.todos.map((todo) => {
            if (todo.id === action.payload.id) {
                return {
                    ...todo,
                    completed: true
                }
            }

            return todo
        })
    },
    sortingTodos: (state, action: PayloadAction<{type: "priority" | "status"}>) => {
        const priorityOrder = {
            low: 1,
            medium: 2,
            high: 3
          };

        if (action.payload.type === "priority") {
            state.todos = state.todos.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        } else if (action.payload.type === "status") {
            state.todos = state.todos.sort((a, b) => Number(a.completed) - Number(b.completed))
        }

        console.log(action.payload.type, state.todos)
    }
  },
})

export const { addTodo, removeTodo, markAsCompleted, sortingTodos } = todoSlice.actions

export default todoSlice.reducer