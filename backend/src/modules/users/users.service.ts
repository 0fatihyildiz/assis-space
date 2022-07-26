import { Like, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '@modules/users/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneBy(query: string, search = false): Promise<User | undefined> {
    let likeQuery: any = query;

    if (search) {
      likeQuery = Like(`%${query}%`);
    }

    return await this.usersRepository.findOne({
      where: [
        {
          id: query,
        },
        {
          displayName: likeQuery,
        },
        {
          email: likeQuery,
        },
      ],
    });
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.usersRepository.find();
  }

  async create(data: User): Promise<User | undefined> {
    try {
      const newUser = await this.usersRepository.save(data);

      return newUser;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        console.log('users.service.create', err);

        throw new BadRequestException({
          code: 400,
          message: 'NOT_UNIQUE',
        });
      }
    }
  }

  async update(target: any, data: Partial<User>) {
    delete data.setPassword;
    await this.usersRepository.update(target, data);

    return true;
  }

  async check(target: any, key: keyof User) {
    const user = await this.findOneBy(target);

    if (!user) {
      throw new NotFoundException();
    }

    return user[key];
  }
}
