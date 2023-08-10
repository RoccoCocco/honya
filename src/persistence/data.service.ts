import { Injectable } from '@nestjs/common';
import { IDataService, IBookRepository, IUserRepository } from '@/core';

import {
  TypeOrmBookEntityRepository,
  TypeOrmUserEntityRepository,
} from './typeorm';

@Injectable()
export class DataService implements IDataService {
  book: IBookRepository;

  user: IUserRepository;

  constructor(
    book: TypeOrmBookEntityRepository,
    user: TypeOrmUserEntityRepository,
  ) {
    this.book = book;
    this.user = user;
  }
}
