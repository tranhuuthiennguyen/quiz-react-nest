import { setSeederFactory } from "typeorm-extension";
import { Question } from "../entities/question.entity";

export default setSeederFactory(Question, (faker) => {
  const question = new Question()
  question.text = faker.lorem.sentence()
  question.explanation = faker.lorem.sentences()
  return question
})