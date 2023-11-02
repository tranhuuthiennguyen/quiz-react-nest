import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
}