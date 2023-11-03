import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Exclude()
  @Column()
  is_correct: boolean

  @ManyToOne(() => Question, (question) => question.choices, { onDelete: 'CASCADE' })
  question: Question
}