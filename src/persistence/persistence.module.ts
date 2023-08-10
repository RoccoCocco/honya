import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { InMemoryBookRepository, InMemoryUserRepository } from './in-memory';
import { TypeOrmModule } from './typeorm/typeorm.module';

@Module({
  imports: [TypeOrmModule],
  providers: [DataService, InMemoryBookRepository, InMemoryUserRepository],
  exports: [DataService],
})
export class PersistenceModule {}
