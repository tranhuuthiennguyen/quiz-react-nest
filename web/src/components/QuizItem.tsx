type QuizItemProps = {
  id: number
  title: string
  description: string
  createdAt: Date
}

export const QuizItem = ({ id, title, description, createdAt }: QuizItemProps) => {
  return (
    <li
      key={id}
    >
      {title}
      <br />
      {description}
    </li>
  )
}
