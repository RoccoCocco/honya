import { Module } from '@nestjs/common';
import { DataService, PersistenceModule } from '@/persistence';
import { BookService, UserService } from './services';

import { Tokens } from './application.tokens';

@Module({
  imports: [PersistenceModule],
  providers: [
    {
      provide: Tokens.DataService,
      useExisting: DataService,
    },
    BookService,
    UserService,
  ],
  exports: [BookService, UserService],
})
export class UseCaseModule {}
