import { Progress } from '@modules/progress/progress.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Question } from './questions.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  lessonName: string;

  @Column({ default: true })
  randomize?: boolean;

  @Column('simple-json')
  variables: Record<any, any>;

  @Column({ default: false })
  private?: boolean;

  @ManyToMany(() => Question, (question) => question.lesson)
  questions?: Question[];

  @OneToMany(() => Progress, (progress) => progress.lesson)
  progress: Progress[];
}

export const normalizeLessons = (lessons: Lesson[], ignorePrivate = false) => {
  return lessons.filter((u) => {
    return !u.private && !ignorePrivate;
  });
};
