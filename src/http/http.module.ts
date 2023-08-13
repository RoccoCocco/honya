import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { UseCaseModule } from '@/usecase';

import {
  AuthenticationController,
  BookController,
  HealthController,
  UserController,
} from './controllers';
import { AuthenticationGuard } from './guards';

@Module({
  controllers: [
    AuthenticationController,
    UserController,
    BookController,
    HealthController,
  ],
  imports: [TerminusModule, UseCaseModule],
  providers: [AuthenticationGuard],
})
export class HttpModule {}
