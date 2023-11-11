import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Quiz } from './interfaces/quiz.interface'
import { QuestionBox } from './components/QuestionBox'
import { UserAnswer } from './interfaces/user-answer.interface'


export const QuizComponent = () => {
  const params = useParams()
  const [quiz, setQuiz] = useState<Quiz>()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    fetch(`http://localhost:3000/quizzes/${params.id}`, { signal }).then(async (response) => {
      if (response.ok) {
        const result = await response.json()
        setQuiz(result)
      } else {
        alert("Uh oh")
      }
    }).catch(error => console.log(error))

    return () => {
      controller.abort()
    }
  }, [])

  const [selectedChoices, setSelectedChoices] = useState<UserAnswer[]>([])

  const handleChoicesSelection = (questionAnswer: UserAnswer) => {
    const existedAnswerIndex = selectedChoices.findIndex(
      (answer) => answer.id === questionAnswer.id
    )

    if (existedAnswerIndex !== -1) {
      const updatedChoices = [...selectedChoices]
      updatedChoices[existedAnswerIndex].selectedChoiceId = questionAnswer.selectedChoiceId
      setSelectedChoices(updatedChoices)
    } else {
      setSelectedChoices([...selectedChoices, questionAnswer])
    }
  }

  const handleSubmitQuiz = () => {
    const totalQuestions = quiz?.questions?.length!
    if (selectedChoices.length < totalQuestions) {
      alert("You must answer all questions")
    } else {
      fetch(`http://localhost:3000/quizzes/${params.id}/evaluate`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_response: selectedChoices
        })
      }).then(async (response) => {
        if (response.ok) {
          const result = await response.json()
          console.log(result)
        }
      })
    }
  }

  return (
    <>
      <div className='flex flex-col justify-center'>
        <div className='m-auto w-1/2'>
          {quiz?.questions?.map((question, index) => {
            return <QuestionBox
              index={index}
              id={question.id}
              text={question.text}
              choices={question.choices}
              onChoiceSelected={handleChoicesSelection}
            ></QuestionBox>
          })}
        </div>
        <button className='bg-[#48bebe] rounded-md p-2 text-[#ffffff] hover:shadow-xl min-w-min' onClick={handleSubmitQuiz}>Submit quiz</button>
      </div>
    </>
  )
}
