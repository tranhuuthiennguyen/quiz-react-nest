import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Option])],
  controllers: [QuizzesController],
  providers: [QuizzesService]
})
export class QuizzesModule { }
