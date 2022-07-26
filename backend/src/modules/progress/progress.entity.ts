import { Lesson } from '@modules/lessons/lessons.entity';
import { User } from '@modules/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { ProgressQuestion } from './progressQuestions.entity';

@Entity('progress')
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  completed?: boolean;

  @ManyToMany(
    () => ProgressQuestion,
    (progressQuestions) => progressQuestions.progress,
  )
  progressQuestions?: ProgressQuestion[];

  @ManyToOne(() => User, (user) => user.progress)
  user?: User;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress)
  lesson: Lesson;
}
