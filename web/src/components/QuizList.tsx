import { useEffect, useState } from "react"
import { QuizItem } from "./QuizItem"
import { Quiz } from "../interfaces/quiz.interface"

export const QuizList = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch('http://localhost:3000/quizzes', { signal }).then(async (response) => {
      if (response.ok) {
        const result = await response.json()
        setQuizzes(result)
      } else {
        alert("Our server are down, try again later")
      }
    })
      .catch(error => console.log(error))

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <ul className='align-middle'>
        {quizzes.map(
          quiz =>
            <QuizItem
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              createdAt={quiz.createdAt}
            />
        )}
      </ul>
    </>
  )
}
