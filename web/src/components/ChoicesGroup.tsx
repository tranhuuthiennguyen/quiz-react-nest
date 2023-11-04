import { Choice } from '../interfaces/choice.interface'
import { UserAnswer } from '../interfaces/user-answer.interface'

type ChoicesGroupProps = {
  questionId: number
  choices: Choice[]
  onChoiceSelected: (userAnswer: UserAnswer) => void
}

export const ChoicesGroup = ({ questionId, choices, onChoiceSelected }: ChoicesGroupProps) => {

  const handleChoiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const answer: UserAnswer = {
      id: questionId,
      selectedChoiceId: parseInt(event.target.value)
    }
    onChoiceSelected(answer)
  };

  return (
    <>
      <div className='p-2'>
        {choices.map(choice =>
          <div className='p-2 hover:bg-[#bfdbfe] rounded-full'>
            <label>
              <input type='radio' name='choice' value={choice.id} onChange={handleChoiceChange} /> {choice.text}
            </label>
          </div>
        )}
      </div>
    </>
  )
}
