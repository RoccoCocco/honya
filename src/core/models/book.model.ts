import { GenericList } from '../interfaces';

export class Book {
  id!: string;

  title!: string;

  description!: string;

  authorId!: string;
}

export class BookList implements GenericList<Book> {
  items!: Array<Book>;
}
