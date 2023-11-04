import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { EntityManager, Repository } from 'typeorm';
import { Quiz } from 'src/database/entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswersDto } from '../dto/user-answers.dto';
import { QuestionsService } from './questions.service';
import { QuestionAnswerDto, QuizAnswersDto } from '../dto/quiz-answer.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly questionsService: QuestionsService,
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

  async evaluate(id: number, userAnswers: UserAnswersDto) {
    let quizAnswers: QuizAnswersDto = {
      questionAnswers: []
    }
    const quiz = await this.findOne(id)

    if (!quiz) {
      throw new NotFoundException("Quiz not found")
    }

    for (const answer of userAnswers.questionResponse) {
      const question = await this.questionsService.fineOne(answer.id, id)
      if (!question) {
        throw new NotFoundException("Question not found or not in quiz")
      }

      const choices = await this.questionsService.getChoices(answer.id)

      let questionAnswer: QuestionAnswerDto = {
        questionId: question.id,
        isCorrect: false
      }

      for (const choice of choices) {

        if (answer.selectedChoiceId === choice.id && choice.is_correct) {
          questionAnswer.isCorrect = true
        }

      }

      quizAnswers.questionAnswers.push(questionAnswer)
    }

    return quizAnswers
  }
}
