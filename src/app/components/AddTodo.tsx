'use client'

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from "../lib/features/todos/todosSlice"
import { v4 as uuidv4 } from "uuid"
import { RootState } from "../lib/store"
import Modal from "./Modal"

type Priority = "low" | "medium" | "high"

export default function AddTodo() {
    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<Priority>("low")
    const [dependentTodos, setDependentTodos] = useState<string[]>([])
    const dispatch = useDispatch()
    const todos = useSelector((state: RootState) => state.todos.todos)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAddTodo = () => {
        if (title === "") return 

        dispatch(addTodo({
            todo: {
                id: uuidv4(),
                title,
                completed: false,
                priority,
                createdDate: new Date().toISOString(),
                dependsOn: dependentTodos
            }
        }))

        setTitle("")
    }

    const handleChange = (_e: React.MouseEvent<HTMLDivElement>, id: string) => {
        if (!dependentTodos.includes(id)) {
            setDependentTodos(prev => [...prev, id]);
        } else {
            const filtered = dependentTodos.filter(todoId => todoId !== id)
            setDependentTodos(filtered)
        }
      };

    return (
        <div>
            <div className="flex flex-row space-x-2">
                <select className="border-1 p-2 rounded-md" onChange={(e) => setPriority(e.target.value as Priority)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input className="border-1 p-2 rounded-md w-full" value={title} onChange={e => setTitle(e.target.value)} />
                <button className={`${title === '' ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded-md cursor-pointer`} onClick={handleAddTodo} disabled={title === ""}>Add</button>
            </div>
            <div>
                <button className={`${title === '' ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded-md cursor-pointer w-100 mt-5`} onClick={() => setIsModalOpen(true)} disabled={title === ""}>Select Dependency</button>
            </div>
            <Modal title="Select Dependent Tasks" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {todos?.map((todo) => (
                    <div key={todo?.id} className={`${dependentTodos.includes(todo?.id) ? 'bg-blue-400' : 'bg-blue-300'} mb-2 rounded p-2 text-white cursor-pointer hover:bg-blue-400`} onClick={(e) => handleChange(e, todo?.id)}>
                        <h4>{todo?.title}</h4>
                    </div>
                ))}
            </Modal>
        </div>
    )
}