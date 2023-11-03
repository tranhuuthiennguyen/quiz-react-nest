import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesService } from './services/quizzes.service';
import { QuestionsService } from './services/questions.service';
import { ExcludeFieldInterceptor } from 'src/interceptors/exclude-field.interceptor';
import { UserAnswersDto } from './dto/user-answers.dto';

@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService
  ) { }

  @Post()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  async findAll() {
    return await this.quizzesService.findAll();
  }

  /**
   * get a single quiz with questions and choices
   * @param id quiz id
   * @returns quiz object
   */
  @Get(':id')
  @UseInterceptors(ExcludeFieldInterceptor)
  async findOne(@Param('id') id: string) {
    return await this.quizzesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }

  @Post(':id/evaluate')
  async evaluate(@Param('id') id: string, @Body() userAnswers: UserAnswersDto) {

  }
}
