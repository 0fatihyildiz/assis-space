import {
  Get,
  Param,
  Controller,
  NotFoundException,
  UseGuards,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { checkUser, normalizeUsers, User } from '@modules/users/users.entity';
import { has, isEqual, isObject, keys, uniq } from 'lodash';
import { AdminGuard } from '@guards/admin.guard';
import { VerifiedGuard } from '@guards/verified.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get()
  async all(): Promise<User[]> {
    const users = await this.usersService.findAll();

    if (users.length === 0) {
      throw new NotFoundException();
    }

    return normalizeUsers(users);
  }

  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('find/:query')
  async find(@Param('query') query: string): Promise<User> {
    const user = await this.usersService.findOneBy(query);

    if (!user) {
      throw new NotFoundException();
    }

    return normalizeUsers([user])[0];
  }

  @UseGuards(JwtAuthGuard, VerifiedGuard)
  @Get('search/:query')
  async search(@Param('query') query: string): Promise<User> {
    const user = await this.usersService.findOneBy(query, true);

    if (!user) {
      throw new NotFoundException();
    }

    return normalizeUsers([user])[0];
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('create')
  async create(@Body() body: any) {
    if (!body || !isObject(body)) {
      throw new BadRequestException();
    }

    const checkResults = checkUser(body);

    if (checkResults.error || checkResults.warning) {
      console.log(
        'user.controler.create',
        checkResults.error,
        checkResults.warning,
      );

      throw new BadRequestException({
        code: 400,
        message: (checkResults.error || checkResults.warning).details,
      });
    }

    const user: User = { ...body, ...checkResults.value };
    const newUser = await this.usersService.create(user);
    return normalizeUsers([newUser])[0];
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('/update')
  async update(@Body() body: any) {
    if (
      !body ||
      !isObject(body) ||
      !has(body, 'data') ||
      !(body as any).query ||
      !isObject((body as any).data)
    ) {
      throw new BadRequestException();
    }

    const query: string = (body as any).query;

    const targetUser = await this.usersService.findOneBy(query);
    const data = (body as any).data;
    const checkDiffForKeys = isEqual(
      keys(targetUser),
      uniq([...keys(targetUser), ...keys(data)]),
    );

    if (checkDiffForKeys) {
      const newData: User = {
        ...targetUser,
        ...data,
      };

      await this.usersService.update(targetUser.id, newData);

      return newData;
    } else {
      throw new BadRequestException();
    }
  }
}
