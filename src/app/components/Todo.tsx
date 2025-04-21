"use client"

import { useDispatch, useSelector } from "react-redux";
import { Todo as TodoType } from "../lib/features/todos/todo.types";
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { markAsCompleted, removeTodo } from "../lib/features/todos/todosSlice";
import { canCompleteTask, getTodoById } from "../lib/features/todos/todo.utils";
import { RootState } from "../lib/store";
import { useState } from "react";
import Modal from "./Modal";

export default function Todo({todo}: {todo: TodoType}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false)

    const todos = useSelector((state: RootState) => state.todos.todos)

    const handleDelete = () => {
        const canDelete = canCompleteTask(todo, todos)
        
        if (!canDelete) {
            setModalOpen(true)
        }

        dispatch(removeTodo({id: todo?.id}))
    }

    return (
       <div className="mb-2 flex items-center justify-between p-2 rounded-md border-1 border-blue-300">
            <div className="flex space-x-2 items-center justify-between">
                {todo?.priority === 'low' && (
                    <Image
                        className="cursor-pointer"
                        src="low.svg"
                        alt="check icon"
                        width={20}
                        height={20}
                    />
                )}
                {todo?.priority === 'medium' && (
                    <Image
                        className="cursor-pointer"
                        src="medium.svg"
                        alt="check icon"
                        width={20}
                        height={20}
                    />
                )}
                {todo?.priority === 'high' && (
                    <Image
                        className="cursor-pointer"
                        src="high.svg"
                        alt="check icon"
                        width={20}
                        height={20}
                    />
                )}
                <p className={todo.completed ? 'line-through' : 'normal-case'}>{todo?.title}</p>
            </div>
            <div className="flex space-x-2 items-center justify-between">
                {!todo?.completed && (
                    <Image
                        className="cursor-pointer"
                        src="/check.svg"
                        alt="check icon"
                        width={20}
                        height={20}
                        onClick={() => dispatch(markAsCompleted({id: todo?.id}))}
                    />
                )}
                <Image
                    className="cursor-pointer"
                    src="pencil.svg"
                    alt="pencil icon"
                    width={20}
                    height={20}
                    onClick={() => router.push(`/todo/${todo.id}`)}
                />
                <Image
                    className="cursor-pointer"
                    src="/trash.svg"
                    alt="trash icon"
                    width={20}
                    height={20}
                    onClick={handleDelete}
                />
            </div>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Pending Todos">
                {todo?.dependsOn?.map((depId) => (
                    <div key={depId} className={`bg-blue-400 mb-2 rounded p-2 text-white cursor-pointer hover:bg-blue-400`}>
                        <h4>{getTodoById(depId, todos)?.title}</h4>
                    </div>
                ))}
            </Modal>
       </div>
    )
}