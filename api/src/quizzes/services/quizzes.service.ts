import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { EntityManager, Repository } from 'typeorm';
import { Quiz } from 'src/database/entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly entityManager: EntityManager
  ) { }

  async create(createQuizDto: CreateQuizDto) {
    const quiz = new Quiz(createQuizDto)
    quiz.createdAt = new Date()
    return await this.entityManager.save(createQuizDto)
  }

  async findAll() {
    return await this.quizRepository.find()
  }

  async findOne(id: number) {
    return await this.quizRepository
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.questions', 'question')
      .leftJoinAndSelect('question.choices', 'choice')
      .where('quiz.id = :id', { id })
      .getOne()
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizRepository.findOneBy({ id })
    quiz.title = updateQuizDto.title
    quiz.description = updateQuizDto.desciption
    return await this.entityManager.save(quiz)
  }

  async remove(id: number) {
    return await this.quizRepository.delete(id)
  }
}
