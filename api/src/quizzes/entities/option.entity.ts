import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Column({ nullable: true })
  is_correct: boolean | null

  @ManyToOne(() => Question, (question) => question.options)
  question: Question
}