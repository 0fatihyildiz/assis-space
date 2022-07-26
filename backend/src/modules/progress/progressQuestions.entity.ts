import { Question } from '@modules/lessons/questions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Progress } from './progress.entity';

@Entity('progress-questions')
export class ProgressQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  completed?: boolean;

  @ManyToMany(() => Progress, (progress) => progress.progressQuestions)
  progress: Progress;

  @ManyToOne(() => Question, (question) => question.progressQuestions)
  question: Question;
}
