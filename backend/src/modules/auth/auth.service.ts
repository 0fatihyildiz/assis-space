import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { checkUser, User } from '@modules/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(query: string, pass: string) {
    const user = await this.usersService.findOneBy(query);
    if (user && bcrypt.compareSync(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    return {
      access_token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async register(data: User) {
    const checkForUser = checkUser(data);

    if (checkForUser.error || checkForUser.warning) {
      throw new BadRequestException({
        code: 400,
        message: checkForUser.error || checkForUser.warning,
      });
    }

    const user = checkForUser.value;

    delete user.id;
    const newUser = await this.usersService.create({
      ...user,
      isMod: false,
      isVerified: false,
    });

    return {
      access_token: this.jwtService.sign({
        id: newUser.id,
        email: newUser.email,
      }),
    };
  }
}
