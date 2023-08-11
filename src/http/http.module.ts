import { Module } from '@nestjs/common';

import { UseCaseModule } from '@/usecase';

import {
  AuthenticationController,
  BookController,
  UserController,
} from './controllers';
import { AuthenticationGuard } from './guards';

@Module({
  controllers: [AuthenticationController, UserController, BookController],
  imports: [UseCaseModule],
  providers: [AuthenticationGuard],
})
export class HttpModule {}
