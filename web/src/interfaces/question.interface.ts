import { Choice } from "./choice.interface"

export interface Question {
  id: number
  text: string
  choices: Choice[]
}