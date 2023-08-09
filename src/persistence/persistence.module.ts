import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { InMemoryBookRepository, InMemoryUserRepository } from './in-memory';

@Module({
  imports: [],
  providers: [DataService, InMemoryBookRepository, InMemoryUserRepository],
  exports: [DataService],
})
export class PersistenceModule {}
