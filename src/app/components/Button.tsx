interface Props {
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

export default function Button({
  title,
  disabled,
  className,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      className={`${disabled ? 'bg-gray-500' : 'bg-blue-400'} text-white p-2 rounded-md cursor-pointer hover:bg-blue-500 ${className}`}
      onClick={onClick}
      {...rest}
    >
      {title}
    </button>
  )
}
