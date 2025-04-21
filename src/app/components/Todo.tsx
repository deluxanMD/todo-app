"use client"

import { useDispatch } from "react-redux";
import { Todo as TodoType } from "../lib/features/todos/todo.types";
import Image from "next/image"
import { markAsCompleted, removeTodo } from "../lib/features/todos/todosSlice";

export default function Todo({todo}: {todo: TodoType}) {
    const dispatch = useDispatch()

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
                    onClick={() => dispatch(markAsCompleted({id: todo?.id}))}
                />
                <Image
                    className="cursor-pointer"
                    src="/trash.svg"
                    alt="trash icon"
                    width={20}
                    height={20}
                    onClick={() => dispatch(removeTodo({id: todo?.id}))}
                />
            </div>
       </div>
    )
}