import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { normalizeUsers, User } from '@modules/users/users.entity';
import { LocalAuthGuard } from '@guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { isObject } from 'lodash';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { UsersService } from '@modules/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('revalidate')
  async example(@Req() req: Request): Promise<Partial<User>> {
    const user = req.user as User;

    const header = req.headers.authorization.split('Bearer ');
    const token = header[header.length - 1];
    let credentials: Partial<User>;
    try {
      credentials = this.jwtService.verify(token) as Partial<User>;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      } else {
        throw new InternalServerErrorException();
      }
    }

    if (user.id !== credentials.id || user.email !== credentials.email) {
      throw new UnauthorizedException();
    }

    return normalizeUsers([user])[0];
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as User);
  }

  @Post('register')
  async register(@Body() body: any) {
    if (!body || !isObject(body)) {
      throw new BadRequestException();
    }

    return await this.authService.register(body as User);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/checkVerified')
  async checkVerified(@Req() req: Request) {
    const user = req.user as User;

    const value = await this.usersService.check(user.id, 'isVerified');

    return {
      data: value === true,
    };
  }
}
