import { User } from '@modules/users/users.entity';
import { UsersService } from '@modules/users/users.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = (context as any).getRequest();
    const userPartail = req.user as User;
    if (!userPartail || !userPartail.id) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findOneBy(userPartail.id);

    if (!user || !(user as User).isVerified) {
      throw new UnauthorizedException();
    } else {
      return true;
    }
  }
}
