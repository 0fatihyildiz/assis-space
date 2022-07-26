import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';

import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lessons.entity';
import { Question } from './questions.entity';

@Module({
  exports: [LessonsService],
  providers: [LessonsService],
  controllers: [LessonsController],
  imports: [TypeOrmModule.forFeature([Question, Lesson])],
})
export class LessonsModule {
  constructor(private dataSource: DataSource) {}
}
