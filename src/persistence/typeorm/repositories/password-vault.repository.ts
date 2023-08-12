import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IPasswordVaultRepository, PasswordVault } from '@/core';

import { PasswordVaultEntity } from '../entities';

@Injectable()
export class TypeOrmPasswordVaultRepository
  implements IPasswordVaultRepository
{
  constructor(
    @InjectRepository(PasswordVaultEntity)
    private readonly repository: Repository<PasswordVaultEntity>,
  ) {}

  async create(data: PasswordVault) {
    const entity = this.repository.create(data);
    await this.repository.save(entity, { reload: true });

    return entity.id;
  }

  async delete() {
    throw new Error('Not implemented');
  }

  async update() {
    throw new Error('Not implemented');
  }

  async getById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<never> {
    throw new Error('Not implemented');
  }
}
