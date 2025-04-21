interface Props {
  title: string
  completed: boolean
}

export default function TodoTitle({ title, completed }: Props) {
  return <p className={completed ? 'line-through' : 'normal-case'}>{title}</p>
}
