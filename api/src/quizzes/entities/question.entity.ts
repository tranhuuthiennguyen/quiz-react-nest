import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { Option } from "./option.entity";

enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  OPEN_ENDED = 'open_ended'
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({
    type: 'enum',
    enum: QuestionType,
    default: QuestionType.MULTIPLE_CHOICE
  })
  type: QuestionType

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz

  @OneToMany((type) => Option, (option) => option.question)
  options: Option[]
}