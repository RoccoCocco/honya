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
  query(dto: BookQueryDto): QueryOptions<Book> {
    return dto;
  }

  create(dto: BookCreateDto): Book {
    return plainToClass(Book, dto);
  }

  update(dto: BookUpdateDto): Partial<Book> {
    return plainToClass(Book, dto);
  }
}

export class BookDtoFactory {
  toDto(book: BookList): BookListDto;
  toDto(book: Book): BookDto;
  toDto(book: Book | BookList): BookDto | BookListDto {
    if (!('items' in book)) {
      return plainToClass(BookDto, book);
    }

    const list = new BookListDto();
    list.items = book.items.map((book) => plainToClass(BookDto, book));
    return list;
  }
}
