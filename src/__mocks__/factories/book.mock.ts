import { faker } from '@faker-js/faker';

import { Book } from '@/core';

export class BookDtoMockFactory {
  static makeAdminBook() {
    const book = new Book();

    book.authorId = faker.string.uuid();
    book.id = faker.string.uuid();
    book.description = faker.word.words(40);
    book.title = faker.word.words(20);

    return book;
  }
}
