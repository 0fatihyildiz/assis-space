import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersModule } from '@modules/users/users.module';
import { ThrottlerBehindProxyGuard } from '@guards/throttler-behind-proxy.guard';
import { LessonsModule } from '@modules/lessons/lessons.module';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
    AppService,
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '.db/app.db',
      entities: [resolve(__dirname, '../../**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    ThrottlerModule.forRoot({
      ttl: +process.env.THROTTLE_TTL,
      limit: +process.env.THROTTLE_LIMIT,
    }),
    UsersModule,
    AuthModule,
    LessonsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
