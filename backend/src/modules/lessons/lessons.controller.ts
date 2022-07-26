import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
  Get,
  Param,
  Controller,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { Lesson, normalizeLessons } from './lessons.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async all(): Promise<Lesson[]> {
    const lessons = await this.lessonsService.findAll();

    if (lessons.length === 0) {
      throw new NotFoundException();
    }

    return normalizeLessons(lessons);
  }

  @Get('find/:query')
  @UseGuards(JwtAuthGuard)
  async find(@Param('query') query: string): Promise<Lesson> {
    const lesson = await this.lessonsService.findOneBy(query, true);

    if (!lesson) {
      throw new NotFoundException();
    }

    return normalizeLessons([lesson])[0];
  }
}
