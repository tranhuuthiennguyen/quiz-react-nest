import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Choice } from "src/database/entities/choice.entity";
import { Question } from "src/database/entities/question.entity";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class QuestionsService {
  /**
   *
   */
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
    private readonly entityManager: EntityManager
  ) { }

  async findAll(quizId: number) {
    return await this.questionRepository.find({
      where: {
        quiz: {
          id: quizId
        }
      }
    })
  }

  async fineOne(id: number, quizId: number) {
    return await this.questionRepository.findOne({
      where: {
        id: id,
        quiz: {
          id: quizId
        }
      }
    })
  }

  async getChoices(id: number) {
    return await this.choiceRepository.find({
      where: {
        question: {
          id: id
        }
      }
    })
  }
}