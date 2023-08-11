import { Test } from '@nestjs/testing';

import { BookDtoMockFactory, UserDtoMockFactory } from '@/__mocks__';
import { Book, BookDto, BookList, BookListDto } from '@/core';

import { DATA_SERVICE } from '../usecase.tokens';
import { BookService } from './book.service';

const DataServiceMock = {
  book: {
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

describe(BookService.name, () => {
  let service: BookService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: DATA_SERVICE, useValue: DataServiceMock },
        BookService,
      ],
    }).compile();

    service = moduleRef.get<BookService>(BookService);
  });

  describe('get', () => {
    it('should return book dto', async () => {
      DataServiceMock.book.getById.mockResolvedValueOnce(new Book());
      expect(await service.get('test-id')).toBeInstanceOf(BookDto);
    });
  });

  describe('getAll', () => {
    it('should return book list dto', async () => {
      const list = new BookList();
      list.items = [new Book()];
      DataServiceMock.book.getAll.mockResolvedValueOnce(list);
      expect(await service.getAll()).toBeInstanceOf(BookListDto);
    });
  });

  describe('create', () => {
    it('should create', async () => {
      const bookDataMock = BookDtoMockFactory.makeAdminBook();
      const userDataMock = UserDtoMockFactory.makeAdminUser();
      expect(await service.create(userDataMock, bookDataMock)).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('should delete', async () => {
      const bookDataMock = BookDtoMockFactory.makeAdminBook();
      const userDataMock = UserDtoMockFactory.makeAdminUser();
      DataServiceMock.book.getById.mockResolvedValueOnce(bookDataMock);
      expect(
        await service.delete(userDataMock, bookDataMock.id),
      ).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update', async () => {
      const bookDataMock = BookDtoMockFactory.makeAdminBook();
      const userDataMock = UserDtoMockFactory.makeAdminUser();
      expect(
        await service.update(userDataMock, bookDataMock.id, bookDataMock),
      ).toBeUndefined();
    });
  });
});
