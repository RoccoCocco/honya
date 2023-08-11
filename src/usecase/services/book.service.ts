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
} from '@/core';

import { BookDtoFactory, BookFactory } from '../factories';
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class BookService {
  private readonly factory = new BookFactory();
  private readonly dtoFactory = new BookDtoFactory();

  constructor(
    @Inject(DATA_SERVICE)
    private readonly dataService: IDataService,
  ) {}

  async get(id: string): Promise<BookDto> {
    const book = await this.dataService.book.getById(id);
    return this.dtoFactory.toDto(book);
  }

  async getAll(dto?: BookQueryDto): Promise<BookListDto> {
    const books = await this.dataService.book.getAll(
      dto && this.factory.query(dto),
    );
    return this.dtoFactory.toDto(books);
  }

  async create(
    requester: AuthenticatedUserDto,
    dto: BookCreateDto,
  ): Promise<void> {
    await validateOrReject(dto);

    const book = this.factory.create(dto);
    book.authorId = requester.id;

    await this.dataService.book.create(book);
  }

  async delete(requester: AuthenticatedUserDto, id: string): Promise<void> {
    const book = await this.dataService.book.getById(id);
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

    new BookPermission(requester).canUpdate(book);

    const updateData = this.factory.update(dto);
    await this.dataService.book.update(id, updateData);
  }
}
