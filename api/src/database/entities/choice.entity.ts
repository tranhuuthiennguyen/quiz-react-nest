import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column()
  is_correct: boolean

  @ManyToOne(() => Question, (question) => question.options, { onDelete: 'CASCADE' })
  question: Question
}