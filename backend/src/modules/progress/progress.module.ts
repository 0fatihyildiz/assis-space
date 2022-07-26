import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Progress } from './progress.entity';
import { ProgressQuestion } from './progressQuestions.entity';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';

@Module({
  exports: [ProgressService],
  providers: [ProgressService],
  controllers: [ProgressController],
  imports: [TypeOrmModule.forFeature([ProgressQuestion, Progress])],
})
export class ProgressModule {
  constructor(private dataSource: DataSource) {}
}
