import { Inject, Injectable } from '@nestjs/common';
import {
  IDataService,
  UserPermission,
  UserDto,
  UserCreateDto,
  UserUpdateDto,
} from '@/core';
import { validateOrReject } from 'class-validator';
import { UserFactory } from '../factories';
import { Tokens } from '../application.tokens';

@Injectable()
export class UserService {
  private readonly factory = new UserFactory();

  constructor(
    @Inject(Tokens.DataService)
    private readonly repository: IDataService,
  ) {}

  async get(id: string): Promise<UserDto> {
    const user = await this.repository.user.getById(id);
    return this.factory.toDto(user);
  }

  async getAll(): Promise<Array<UserDto>> {
    const users = await this.repository.user.getAll();
    return users.map((user) => this.factory.toDto(user));
  }

  async create(requesterId: string, dto: UserCreateDto): Promise<void> {
    await validateOrReject(dto);

    const requester = await this.repository.user.getById(requesterId);
    const permission = new UserPermission(requester);

    permission.canCreate();

    const user = this.factory.create(dto);
    await this.repository.user.create(user);
  }

  async delete(requesterId: string, id: string): Promise<void> {
    const user = await this.repository.user.getById(id);
    const requester = await this.repository.user.getById(requesterId);
    const permission = new UserPermission(requester);

    permission.canDelete(user);

    await this.repository.user.delete(id);
  }

  async update(
    requesterId: string,
    id: string,
    dto: UserUpdateDto,
  ): Promise<void> {
    await validateOrReject(dto);

    const updateData = this.factory.update(dto);
    const requester = await this.repository.user.getById(requesterId);
    const permission = new UserPermission(requester);

    permission.canUpdate(id, updateData);

    await this.repository.user.update(id, updateData);
  }
}
