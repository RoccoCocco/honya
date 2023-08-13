import { Inject, Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';

import {
  AuthenticatedUserDto,
  BookCreateDto,
  BookDto,
  BookListDto,
  BookPermission,
  BookQueryDto,
  BookUpdateDto,
  IDataService,
  NotFoundFactory,
} from '@/core';

import { BookDtoFactory, BookFactory } from '../factories';
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class BookService {
  constructor(
    @Inject(DATA_SERVICE)
    private readonly dataService: IDataService,
  ) {}

  async get(id: string): Promise<BookDto> {
    const book = await this.dataService.book.getById(id);

    if (book === null) {
      throw NotFoundFactory.forResource({ type: 'book', id });
    }

    return BookDtoFactory.toDto(book);
  }

  async getAll(dto?: BookQueryDto): Promise<BookListDto> {
    const books = await this.dataService.book.getAll(
      dto && BookFactory.query(dto),
    );
    return BookDtoFactory.toDto(books);
  }

  async getAllByAuthor(authorId: string, dto?: BookQueryDto) {
    const books = await this.dataService.book.getAllByAuthor(
      authorId,
      dto && BookFactory.query(dto),
    );

    return BookDtoFactory.toDto(books);
  }

  async create(
    requester: AuthenticatedUserDto,
    dto: BookCreateDto,
  ): Promise<BookDto> {
    await validateOrReject(dto);

    const book = BookFactory.create(dto);
    book.authorId = requester.id;

    const createdBook = await this.dataService.book.create(book);

    return BookDtoFactory.toDto(createdBook);
  }

  async delete(requester: AuthenticatedUserDto, id: string): Promise<void> {
    const book = await this.dataService.book.getById(id);

    if (book === null) {
      throw NotFoundFactory.forResource({ type: 'book', id });
    }

    new BookPermission(requester).canDelete(book);
    await this.dataService.book.delete(id);
  }

  async update(
    requester: AuthenticatedUserDto,
    id: string,
    dto: BookUpdateDto,
  ): Promise<void> {
    await validateOrReject(dto);

    const book = await this.dataService.book.getById(requester.id);

    if (book === null) {
      throw NotFoundFactory.forResource({ type: 'book', id });
    }

    new BookPermission(requester).canUpdate(book);

    const updateData = BookFactory.update(dto);
    await this.dataService.book.update(id, updateData);
  }
}
