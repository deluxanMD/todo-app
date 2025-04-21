interface Props {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ value, onChange }: Props) {
  return (
    <input
      className="border-1 p-2 rounded-md w-full"
      value={value}
      onChange={onChange}
    />
  )
}
