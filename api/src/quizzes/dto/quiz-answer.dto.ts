export class QuizAnswersDto {
  questionAnswers: QuestionAnswerDto[]
}

export class QuestionAnswerDto {
  questionId: number
  isCorrect: boolean
}