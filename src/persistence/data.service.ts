import { Injectable } from '@nestjs/common';
import { IDataService, IBookRepository, IUserRepository } from '@/core';

import { InMemoryBookRepository, InMemoryUserRepository } from './in-memory';

@Injectable()
export class DataService implements IDataService {
  book: IBookRepository;

  user: IUserRepository;

  constructor(book: InMemoryBookRepository, user: InMemoryUserRepository) {
    this.book = book;
    this.user = user;
  }
}
