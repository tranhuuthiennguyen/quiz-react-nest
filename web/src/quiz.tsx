import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Quiz = () => {
  const params = useParams()
  const [quiz, setQuiz] = useState()

  useEffect(() => {

  })
  return (
    <div>{params.id}</div>
  )
}
