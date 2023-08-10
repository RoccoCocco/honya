import { Inject, Injectable } from '@nestjs/common';
import {
  IDataService,
  BookPermission,
  BookDto,
  BookCreateDto,
  BookUpdateDto,
  BookListDto,
} from '@/core';
import { validateOrReject } from 'class-validator';
import { BookFactory, BookDtoFactory } from '../factories';

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

  async getAll(): Promise<BookListDto> {
    const books = await this.dataService.book.getAll();
    return this.dtoFactory.toDto(books);
  }

  async create(requesterId: string, dto: BookCreateDto): Promise<void> {
    dto.author = requesterId;
    await validateOrReject(dto);

    const book = this.factory.create(dto);
    await this.dataService.book.create(book);
  }

  async delete(requesterId: string, id: string): Promise<void> {
    const book = await this.dataService.book.getById(id);
    const requester = await this.dataService.user.getById(requesterId);
    const permission = new BookPermission(requester);

    permission.canDelete(book);

    await this.dataService.book.delete(id);
  }

  async update(
    requesterId: string,
    id: string,
    dto: BookUpdateDto,
  ): Promise<void> {
    await validateOrReject(dto);

    const book = await this.dataService.book.getById(requesterId);
    const requester = await this.dataService.user.getById(requesterId);
    const permission = new BookPermission(requester);

    permission.canUpdate(book);

    const updateData = this.factory.update(dto);
    await this.dataService.book.update(id, updateData);
  }
}
