import Image from 'next/image'
import { Todo } from '../lib/features/todos/todo.types'
import { getTodoById } from '../lib/features/todos/todo.utils'

interface Props {
  depId: string
  todos: Todo[]
  handleDelete: () => void
}

export default function DependencyListItem({
  depId,
  todos,
  handleDelete,
}: Props) {
  return (
    <div className="flex flex-row items-center space-x-4">
      <p>{getTodoById(depId, todos)?.title}</p>
      <Image
        className="cursor-pointer"
        src="/trash.svg"
        alt="trash icon"
        width={15}
        height={15}
        onClick={handleDelete}
      />
    </div>
  )
}
