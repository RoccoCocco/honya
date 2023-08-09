import { Module } from '@nestjs/common';
import { DataService, PersistenceModule } from '@/persistence';
import { BookService } from './book';
import { UserService } from './user';
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
