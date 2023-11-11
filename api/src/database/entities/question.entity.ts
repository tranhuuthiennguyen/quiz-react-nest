import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quiz } from "./quiz.entity";
import { Choice } from "./choice.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  text: string

  @Exclude()
  @Column()
  explanation: string

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: 'CASCADE' })
  quiz: Quiz

  @OneToMany((type) => Choice, (choice) => choice.question, { onDelete: 'CASCADE' })
  choices: Choice[]
}