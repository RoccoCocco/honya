import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from './typeorm.module';
import { TypeOrmModule as CoreTypeOrmModule } from '@nestjs/typeorm';
import { BasicSeeder } from './seeders/basic.seeder';
import { BookEntity, UserEntity } from './entities';

seeder({
  imports: [
    TypeOrmModule,
    CoreTypeOrmModule.forFeature([BookEntity, UserEntity]),
  ],
}).run([BasicSeeder]);
