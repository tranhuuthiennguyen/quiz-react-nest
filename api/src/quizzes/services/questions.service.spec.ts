import { EntityManager, Repository } from "typeorm"
import { QuestionsService } from "./questions.service"
import { Question } from "src/database/entities/question.entity"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"

describe("QuestionsService", () => {
  let service: QuestionsService
  let questionRepository: Repository<Question>
  let entityManager: EntityManager

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuestionsService,
        EntityManager,
        {
          provide: getRepositoryToken(Question),
          useClass: Repository
        }
      ]
    }).compile()

    service = module.get<QuestionsService>(QuestionsService)
    questionRepository = module.get<Repository<Question>>(getRepositoryToken(Question))
    entityManager = module.get<EntityManager>(EntityManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})