import { Module } from '@nestjs/common';

import { UseCaseModule } from '@/usecase';
import { BookController, UserController } from './controllers';

@Module({
  controllers: [UserController, BookController],
  imports: [UseCaseModule],
})
export class HttpModule {}
