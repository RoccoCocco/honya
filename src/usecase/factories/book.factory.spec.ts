import { Book, BookDto, BookList, BookListDto } from '@/core';

import { BookDtoFactory, BookFactory } from './book.factory';

describe(BookFactory.name, () => {
  it('shold be instance of book', () => {
    expect(BookFactory.create(new BookDto())).toBeInstanceOf(Book);
    expect(BookFactory.update(new BookDto())).toBeInstanceOf(Book);
  });
});

describe(BookDtoFactory.name, () => {
  it('shold be instance of book dto', () => {
    expect(BookDtoFactory.toDto(new Book())).toBeInstanceOf(BookDto);
  });
  it('shold be instance of book list dto', () => {
    const bookList = new BookList();
    bookList.items = [new Book()];

    expect(BookDtoFactory.toDto(bookList)).toBeInstanceOf(BookListDto);
  });
});
