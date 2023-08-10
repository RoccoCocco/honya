import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import type { Book } from '../../../core';

@Entity({ name: 'books' })
export class BookEntity implements Book {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_book_id' })
  id!: string;

  @Column('uuid')
  authorId!: string;

  @Column('text')
  description!: string;

  @Column('text')
  title!: string;
}
