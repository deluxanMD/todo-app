import { Todo } from '@/app/lib/features/todos/todo.types'

interface Props {
  dependentTodos?: string[]
  todo: Todo
  onClick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void
}

export default function TodoListItem({
  dependentTodos,
  todo,
  onClick = () => null,
}: Props) {
  return (
    <div
      className={`${dependentTodos?.includes(todo?.id) ? 'bg-blue-400' : 'bg-blue-300'} mb-2 rounded p-2 text-white cursor-pointer hover:bg-blue-400`}
      onClick={(e) => onClick(e, todo?.id)}
    >
      <h4>{todo?.title}</h4>
    </div>
  )
}
