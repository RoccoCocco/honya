import { TypeOrmModule as CoreTypeOrmModule } from '@nestjs/typeorm';
import { seeder } from 'nestjs-seeder';

import { BookEntity, UserEntity } from './entities';
import { BasicSeeder } from './seeders/basic.seeder';
import { TypeOrmModule } from './typeorm.module';

seeder({
  imports: [
    TypeOrmModule,
    CoreTypeOrmModule.forFeature([BookEntity, UserEntity]),
  ],
}).run([BasicSeeder]);
