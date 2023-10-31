import { Test, TestingModule } from "@nestjs/testing"
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm"
import { QuizzesService } from "./quizzes.service"
import { EntityManager, Repository } from "typeorm";
import { Quiz } from "src/database/entities/quiz.entity";
import { CreateQuizDto } from "../dto/create-quiz.dto";

describe('QuizzesService', () => {
  let service: QuizzesService
  let quizRepository: Repository<Quiz>
  let entityManager: EntityManager

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        EntityManager,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Repository
        }
      ]
    }).compile()

    service = module.get<QuizzesService>(QuizzesService)
    quizRepository = module.get<Repository<Quiz>>(getRepositoryToken(Quiz))
    entityManager = module.get<EntityManager>(EntityManager)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a quiz', async () => {
      const createQuizDto = { title: 'New Quiz', description: 'Quiz description' }
      const quiz = new Quiz()
      quiz.title = createQuizDto.title
      quiz.description = createQuizDto.description

      jest.spyOn(entityManager, 'save').mockResolvedValue(quiz)

      const result = await service.create(createQuizDto as unknown as CreateQuizDto)

      expect(result).toEqual(quiz)
    })
  })

  describe('findAll', () => {
    it('should return an array of quizzes', async () => {
      const quizzes: Quiz[] = [
        {
          id: 1,
          title: 'Quiz 1',
          description: 'Quiz description',
          createdAt: new Date(),
          questions: []
        },
        {
          id: 2,
          title: 'Quiz 2',
          description: 'Quiz description',
          createdAt: new Date(),
          questions: []
        }
      ]

      jest.spyOn(quizRepository, 'find').mockResolvedValue(quizzes)

      const result = await service.findAll()

      expect(result).toEqual(quizzes)
    })
  })
})