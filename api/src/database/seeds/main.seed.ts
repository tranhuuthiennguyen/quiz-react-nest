import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { Quiz } from "../entities/quiz.entity";
import { Question } from "../entities/question.entity";
import { Choice } from "../entities/choice.entity";
import { faker } from "@faker-js/faker";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const questionRepository = dataSource.getRepository(Question)
    const choiceRepository = dataSource.getRepository(Choice)

    const quizFactory = await factoryManager.get(Quiz)
    const questionFactory = await factoryManager.get(Question)
    const choiceFactory = await factoryManager.get(Choice)

    const quizzes = await quizFactory.saveMany(10)

    for (const quiz of quizzes) {
      const questions = await Promise.all(
        Array(5)
          .fill("")
          .map(async () => {
            const question = await questionFactory.make({
              quiz: quiz
            })
            return question
          })
      )
      await questionRepository.save(questions)

      for (const question of questions) {
        const choices = await Promise.all(
          Array(4)
            .fill("")
            .map(async () => {
              const choice = await choiceFactory.make({
                question: question
              })
              return choice
            })
        )

        faker.helpers.arrayElement(choices).is_correct = true

        await choiceRepository.save(choices)
      }
    }
  }
}