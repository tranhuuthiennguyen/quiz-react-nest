import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from '../database/entities/quiz.entity';
import { Question } from '../database/entities/question.entity';
import { Choice } from '../database/entities/choice.entity';
import { QuizzesService } from './services/quizzes.service';
import { QuestionsService } from './services/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Choice])],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuestionsService]
})
export class QuizzesModule { }
