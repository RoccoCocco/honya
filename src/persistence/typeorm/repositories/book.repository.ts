import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookList, IBookRepository, QueryOptions } from '@/core';
import { BookEntity } from '../entities';

@Injectable()
export class TypeOrmBookEntityRepository implements IBookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly repository: Repository<BookEntity>,
  ) {}

  async create(data: Book) {
    const userEntity = this.repository.create(data);
    await this.repository.save(userEntity, { reload: true });

    return userEntity.id;
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async update(id: string, data: Partial<Book>) {
    await this.repository.update(id, data);
  }

  async getById(id: string) {
    return this.repository.findOneOrFail({ where: { id } });
  }

  async getAll(queryOptions?: QueryOptions<Book>): Promise<BookList> {
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
}
