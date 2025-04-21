import Image from 'next/image'

interface Props {
  priority: 'low' | 'medium' | 'high'
}

export default function PriorityIcon({ priority }: Props) {
  return (
    <>
      {priority === 'low' && (
        <Image
          className="cursor-pointer"
          src="low.svg"
          alt="check icon"
          width={20}
          height={20}
        />
      )}
      {priority === 'medium' && (
        <Image
          className="cursor-pointer"
          src="medium.svg"
          alt="check icon"
          width={20}
          height={20}
        />
      )}
      {priority === 'high' && (
        <Image
          className="cursor-pointer"
          src="high.svg"
          alt="check icon"
          width={20}
          height={20}
        />
      )}
    </>
  )
}
