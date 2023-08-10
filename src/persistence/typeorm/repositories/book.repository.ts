import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookList, IBookRepository } from '@/core';
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

  async getAll(): Promise<BookList> {
    const items = await this.repository.find();
    return { items };
  }
}
