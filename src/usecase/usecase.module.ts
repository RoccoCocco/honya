import { Module } from '@nestjs/common';
import { DataService, PersistenceModule } from '@/persistence';
import { BookService, UserService } from './services';

import { DATA_SERVICE } from './usecase.tokens';

@Module({
  imports: [PersistenceModule],
  providers: [
    { provide: DATA_SERVICE, useExisting: DataService },
    BookService,
    UserService,
  ],
  exports: [BookService, UserService],
})
export class UseCaseModule {}
