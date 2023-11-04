export class UserAnswersDto {
  questionResponse: QuestionReponseDto[]
}

export class QuestionReponseDto {
  id: number
  selectedChoiceId: number
}