'use client'

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../lib/features/todos/todosSlice"
import { v4 as uuidv4 } from "uuid"

type Priority = "low" | "medium" | "high"

export default function AddTodo() {
    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<Priority>("low")
    const dispatch = useDispatch()

    const handleAddTodo = () => {
        if (title === "") return 

        dispatch(addTodo({
            todo: {
                id: uuidv4(),
                title,
                completed: false,
                priority,
            }
        }))

        setTitle("")
    }

    return (
        <div className="flex flex-row space-x-2">
            <select className="border-1 p-2 rounded-md" onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input className="border-1 p-2 rounded-md w-full" value={title} onChange={e => setTitle(e.target.value)} />
            <button className="bg-blue-500 text-white p-2 rounded-md cursor-pointer" onClick={handleAddTodo}>Add</button>
        </div>
    )
}