'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import Todo from '../components/Todo'
import AddTodo from '../components/AddTodo'
import SortTodo from '../components/SortTodo'

export default function Todos() {
    const todos = useSelector((state: RootState) => state.todos.todos)

    return (
       <div className='flex items-center justify-center'>
            <div className='mt-20 text-center w-100'>
                <h2 className='h2 uppercase font-extrabold text-4xl w-full'>Todo List</h2>
                <div className='mt-10'>
                    <AddTodo />
                </div>
                <div className='mt-10'>
                    <SortTodo />
                </div>
                <div className='mt-10'>
                    {todos?.map((todo) => <Todo key={todo.id} todo={todo} />)}
                </div>
            </div>
       </div>
    )
}

