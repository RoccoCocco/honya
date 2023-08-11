import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataFactory, Seeder } from 'nestjs-seeder';
import { IsNull, Not, Repository } from 'typeorm';

import { BookEntity, UserEntity } from '../entities';

@Injectable()
export class BasicSeeder implements Seeder {
  constructor(
    @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>,
    @InjectRepository(BookEntity) private readonly book: Repository<BookEntity>,
  ) {}

  async seed(): Promise<void> {
    const users = DataFactory.createForClass(UserEntity).generate(10);

    await this.user.save(users);

    for await (const user of users) {
      const toGenerate = faker.number.int({ min: 2, max: 7 });
      const books = DataFactory.createForClass(BookEntity).generate(toGenerate);

      books.forEach((book) => (book.authorId = user.id));

      await this.book.save(books);
    }
  }

  async drop(): Promise<void> {
    await this.book.delete({ id: Not(IsNull()) });
    await this.user.delete({ id: Not(IsNull()) });
  }
}
