import { faker } from '@faker-js/faker';
import { Factory } from 'nestjs-seeder';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Book } from '../../../core';
import { UserEntity } from '../entities';
const AUTHOR_ID_COLUMN_NAME = 'author_id';

@Entity({ name: 'books' })
export class BookEntity implements Book {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_book_id' })
  @Factory(() => faker.string.uuid())
  id!: string;

  @Column('uuid', { name: AUTHOR_ID_COLUMN_NAME })
  @Factory(() => faker.string.uuid())
  authorId!: string;

  @Column('text')
  @Factory(() => faker.lorem.paragraph({ min: 60, max: 200 }))
  description!: string;

  @Column('text')
  @Factory(() => faker.lorem.sentence({ min: 20, max: 100 }))
  title!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: AUTHOR_ID_COLUMN_NAME,
    foreignKeyConstraintName: 'FK_book_to_user',
  })
  author!: UserEntity;
}
