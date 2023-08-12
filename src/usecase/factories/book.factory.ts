import { plainToClass } from 'class-transformer';

import {
  Book,
  BookCreateDto,
  BookDto,
  BookList,
  BookListDto,
  BookQueryDto,
  BookUpdateDto,
  QueryOptions,
} from '@/core';

export class BookFactory {
  static query(dto: BookQueryDto): QueryOptions<Book> {
    return dto;
  }

  static create(dto: BookCreateDto): Book {
    return plainToClass(Book, dto);
  }

  static update(dto: BookUpdateDto): Partial<Book> {
    return plainToClass(Book, dto);
  }
}

export class BookDtoFactory {
  static toDto(book: BookList): BookListDto;
  static toDto(book: Book): BookDto;
  static toDto(book: Book | BookList): BookDto | BookListDto {
    if (!('items' in book)) {
      const dto = new BookDto();

      dto.authorId = book.authorId;
      dto.description = book.description;
      dto.id = book.id;
      dto.title = book.title;

      return dto;
    }

    const list = new BookListDto();
    list.items = book.items.map((book) => this.toDto(book));

    return list;
  }
}
