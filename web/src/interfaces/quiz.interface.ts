import { Question } from "./question.interface"

export interface Quiz {
  id: number
  title: string
  description: string
  createdAt: string
  questions?: Question[]
}