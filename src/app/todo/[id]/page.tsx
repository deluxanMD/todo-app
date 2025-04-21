import EditTodo from '@/app/components/EditTodo'

interface Props {
  params: {
    id: string
  }
}

export default async function TodoPage({ params }: Props) {
  const id = params.id

  return <EditTodo id={id} />
}
