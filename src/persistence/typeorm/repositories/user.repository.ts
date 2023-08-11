import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUserRepository, QueryOptions, User, UserList } from '@/core';

import { UserEntity } from '../entities';

@Injectable()
export class TypeOrmUserEntityRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create(data: User) {
    const userEntity = this.repository.create(data);
    await this.repository.save(userEntity, { reload: true });

    return userEntity.id;
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async update(id: string, data: Partial<User>) {
    await this.repository.update(id, data);
  }

  async getById(id: string) {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async getAll(queryOptions?: QueryOptions<User>): Promise<UserList> {
    const items = await this.repository.find(
      queryOptions && {
        take: queryOptions.limit,
        skip: queryOptions.offset,
        order: {
          ...(queryOptions.sortBy && {
            [queryOptions.sortBy]: queryOptions.sortOrder ?? 'asc',
          }),
        },
      },
    );
    return { items };
  }

  async getOneByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }
}
