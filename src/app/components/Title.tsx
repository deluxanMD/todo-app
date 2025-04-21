import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h2 className="h2 uppercase font-extrabold text-4xl w-full">{children}</h2>
  )
}
