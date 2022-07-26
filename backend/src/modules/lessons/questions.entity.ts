import { ProgressQuestion } from '@modules/progress/progressQuestions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Lesson } from './lessons.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionName: string;

  @Column('simple-array')
  quest: string[];

  @Column('simple-array')
  requiredVariables: string[];

  @ManyToMany(() => Lesson, (lesson) => lesson.questions)
  lesson: Lesson;

  @OneToMany(
    () => ProgressQuestion,
    (progressQuestions) => progressQuestions.question,
  )
  progressQuestions: ProgressQuestion[];
}
