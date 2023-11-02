import { useNavigate } from "react-router-dom"

type QuizItemProps = {
  id: number
  title: string
  description: string
  createdAt: string
}

export const QuizItem = ({ id, title, description, createdAt }: QuizItemProps) => {
  const date = new Date(createdAt).toUTCString()

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/quiz/${id}`)
  }
  return (
    <>
      <li className='flex m-4 p-4 bg-[#ffffff] rounded-lg shadow-sm flex-row justify-between'
        key={id}
      >
        <div>
          <h2 className='font-bold'>
            {title}
          </h2>
          <p className="text-sm">{description}</p>
          <p>{date}</p>
        </div>
        <div className="my-auto ml-5">
          <button className="bg-[#48bebe] rounded-md p-2 text-[#ffffff] hover:shadow-xl"
            onClick={(handleClick)}
          >Take quiz</button>
        </div>
      </li>
    </>
  )
}
