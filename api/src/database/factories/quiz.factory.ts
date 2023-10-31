import { setSeederFactory } from "typeorm-extension";
import { Quiz } from "../entities/quiz.entity";

export default setSeederFactory(Quiz, (faker) => {
  const quiz = new Quiz()
  quiz.title = faker.lorem.words()
  quiz.description = faker.lorem.sentence()
  quiz.createdAt = new Date()

  return quiz
})