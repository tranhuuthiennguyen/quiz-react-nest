import { Module } from '@nestjs/common';
import { QuizzesModule } from './quizzes/quizzes.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    QuizzesModule,
    DatabaseModule
  ],
  providers: [],
})
export class AppModule { }
