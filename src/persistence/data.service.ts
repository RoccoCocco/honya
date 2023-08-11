import { Injectable } from '@nestjs/common';

import { IDataService } from '@/core';

import {
  TypeOrmBookEntityRepository,
  TypeOrmPasswordVaultRepository,
  TypeOrmUserEntityRepository,
} from './typeorm';

@Injectable()
export class DataService implements IDataService {
  constructor(
    readonly book: TypeOrmBookEntityRepository,
    readonly user: TypeOrmUserEntityRepository,
    readonly passwordVault: TypeOrmPasswordVaultRepository,
  ) {}
}
