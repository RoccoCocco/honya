import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';

import {
  ConflictExceptionFactory,
  IUserRepository,
  QueryOptions,
  User,
  UserList,
} from '@/core';

import { UQ_USERNAME, UserEntity } from '../entities';
import { QueryFactory } from '../factories';

@Injectable()
export class TypeOrmUserEntityRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: User) {
    const userEntity = this.repository.create(data);
    await this.handleError(this.repository.save(userEntity, { reload: true }));

    return userEntity;
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async update(id: string, data: Partial<User>) {
    await this.repository.update(id, data);
  }

  async getById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(queryOptions?: QueryOptions<User>): Promise<UserList> {
    const items = await this.repository.find(
      QueryFactory.findManyQuery(queryOptions),
    );
    return { items };
  }

  async getOneByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }

  async handleError<T>(promise: Promise<T>): Promise<T> {
    return promise.catch((error) => {
      if (
        error instanceof QueryFailedError &&
        error.message.includes(UQ_USERNAME)
      ) {
        throw ConflictExceptionFactory.usernameTaken();
      }
      throw error;
    });
  }
}
