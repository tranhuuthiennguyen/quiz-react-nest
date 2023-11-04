import { Choice } from '../interfaces/choice.interface'
import { UserAnswer } from '../interfaces/user-answer.interface'
import { ChoicesGroup } from './ChoicesGroup'

type QuestionProps = {
  index: number
  id: number
  text: string
  choices: Choice[]
  onChoiceSelected: (userAnswer: UserAnswer) => void
}

export const QuestionBox = ({ index, id, text, choices, onChoiceSelected }: QuestionProps) => {
  return (
    <>
      <div key={index} className='flex m-4 bg-[#ffffff] rounded-lg shadow-sm flex-col'>
        <h2 className='bg-primary rounded-t-lg p-2 text-[#ffffff] font-bold'>Question {index + 1}</h2>
        <p className='m-2'>{text}</p>
        <ChoicesGroup questionId={id} choices={choices} onChoiceSelected={onChoiceSelected} />
      </div>
    </>
  )
}
