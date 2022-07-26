import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Lesson } from './lessons.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson) private lessonsRepository: Repository<Lesson>,
  ) {}

  async findOneBy(query: string, search = false): Promise<Lesson | undefined> {
    let likeQuery: any = query;

    if (search) {
      likeQuery = Like(`%${query}%`);
    }

    return await this.lessonsRepository.findOne({
      where: [
        {
          id: query,
        },
        {
          lessonName: likeQuery,
        },
      ],
    });
  }

  async findAll(): Promise<Lesson[] | undefined> {
    return await this.lessonsRepository.find();
  }
}
