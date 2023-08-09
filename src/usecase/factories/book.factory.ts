import { Book, BookDto, BookCreateDto, BookUpdateDto } from '@/core';
import { plainToClass } from 'class-transformer';

export class BookFactory {
  create(dto: BookCreateDto): Book {
    return plainToClass(Book, dto);
  }

  update(dto: BookUpdateDto): Partial<Book> {
    return plainToClass(Book, dto);
  }

  // TODO move this in another factory
  toDto(book: Book): BookDto {
    return plainToClass(BookDto, book);
  }
}
