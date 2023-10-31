import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  createdAt: Date

  @OneToMany(type => Question, (question) => question.quiz, { onDelete: 'CASCADE' })
  questions: Question[]

  constructor(data?: Partial<Quiz>) {
    if (data) {
      Object.assign(data)
    }
  }
}
