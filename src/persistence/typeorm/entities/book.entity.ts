import { faker } from '@faker-js/faker';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { Book } from '../../../core';

@Entity({ name: 'books' })
export class BookEntity implements Book {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_book_id' })
  @Factory(() => faker.string.uuid())
  id!: string;

  @Column('uuid')
  @Factory(() => faker.string.uuid())
  authorId!: string;

  @Column('text')
  @Factory(() => faker.lorem.paragraph({ min: 60, max: 200 }))
  description!: string;

  @Column('text')
  @Factory(() => faker.lorem.sentence({ min: 20, max: 100 }))
  title!: string;
}
