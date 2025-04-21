import Image from 'next/image'

interface Props {
  completed: boolean
  handleComplete: () => void
  handleEdit: () => void
  handleDelete: () => void
}

export default function ActionIcons({
  completed,
  handleComplete,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <>
      {!completed && (
        <Image
          className="cursor-pointer"
          src="/check.svg"
          alt="check icon"
          width={20}
          height={20}
          onClick={handleComplete}
        />
      )}
      <Image
        className="cursor-pointer"
        src="pencil.svg"
        alt="pencil icon"
        width={20}
        height={20}
        onClick={handleEdit}
      />
      <Image
        className="cursor-pointer"
        src="/trash.svg"
        alt="trash icon"
        width={20}
        height={20}
        onClick={handleDelete}
      />
    </>
  )
}
