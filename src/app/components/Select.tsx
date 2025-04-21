interface Props {
  title?: string
  options: { value: string; label: string }[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

export default function Select({ title, options, className, onChange }: Props) {
  return (
    <div
      className={`${!!title ? 'flex flex-row items-center space-x-2 mt-10 mb-5' : ''} ${className}`}
    >
      <p>{title}</p>
      <select className="border-1 p-2 rounded-md" onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
