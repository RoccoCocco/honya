import { Inject, Injectable } from '@nestjs/common';
import {
  IDataService,
  UserPermission,
  UserDto,
  UserCreateDto,
  UserUpdateDto,
  UserListDto,
} from '@/core';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserFactory, UserDtoFactory } from '../factories';
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class UserService {
  private readonly factory = new UserFactory();
  private readonly dtoFactory = new UserDtoFactory();

  constructor(
    @Inject(DATA_SERVICE)
    private readonly repository: IDataService,
  ) {}

  async get(id: string): Promise<UserDto> {
    const user = await this.repository.user.getById(id);

    return this.dtoFactory.toDto(user);
  }

  async getAll(): Promise<UserListDto> {
    const users = await this.repository.user.getAll();

    return this.dtoFactory.toDto(users);
  }

  async create(requesterId: string, dto: UserCreateDto): Promise<void> {
    await validateOrReject(dto);

    const requester = await this.repository.user.getById(requesterId);

    new UserPermission(requester).canCreate();

    const user = this.factory.create(dto);
    await this.repository.user.create(user);
  }

  async delete(requesterId: string, id: string): Promise<void> {
    const user = await this.repository.user.getById(id);
    const requester = await this.repository.user.getById(requesterId);

    new UserPermission(requester).canDelete(user);

    await this.repository.user.delete(id);
  }

  async update(
    requesterId: string,
    id: string,
    dto: UserUpdateDto,
  ): Promise<void> {
    dto = plainToClass(UserUpdateDto, dto);
    await validateOrReject(dto);

    const updateData = this.factory.update(dto);
    const requester = await this.repository.user.getById(requesterId);

    new UserPermission(requester).canUpdate(id, updateData);

    await this.repository.user.update(id, updateData);
  }
}
