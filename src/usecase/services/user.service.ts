import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import {
  AuthenticatedUserDto,
  IDataService,
  NotFoundFactory,
  UserCreateDto,
  UserDto,
  UserListDto,
  UserPermission,
  UserQueryDto,
  UserUpdateDto,
} from '@/core';

import { UserDtoFactory, UserFactory } from '../factories';
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class UserService {
  constructor(
    @Inject(DATA_SERVICE)
    private readonly repository: IDataService,
  ) {}

  async get(id: string): Promise<UserDto> {
    const user = await this.repository.user.getById(id);

    if (user === null) {
      throw NotFoundFactory.forResource({ type: 'user', id });
    }

    return UserDtoFactory.toDto(user);
  }

  async getAll(dto?: UserQueryDto): Promise<UserListDto> {
    const users = await this.repository.user.getAll(
      dto && UserFactory.query(dto),
    );

    return UserDtoFactory.toDto(users);
  }

  async create(
    requester: AuthenticatedUserDto,
    dto: UserCreateDto,
  ): Promise<UserDto> {
    await validateOrReject(dto);
    new UserPermission(requester).canCreate();

    const user = await this.repository.user.create(UserFactory.create(dto));

    return UserDtoFactory.toDto(user);
  }

  async delete(requester: AuthenticatedUserDto, id: string): Promise<void> {
    const user = await this.repository.user.getById(id);

    if (user === null) {
      throw NotFoundFactory.forResource({ type: 'user', id });
    }

    new UserPermission(requester).canDelete(user);
    await this.repository.user.delete(id);
  }

  async update(
    requester: AuthenticatedUserDto,
    id: string,
    dto: UserUpdateDto,
  ): Promise<void> {
    dto = plainToClass(UserUpdateDto, dto);
    await validateOrReject(dto);
    const updateData = UserFactory.update(dto);
    new UserPermission(requester).canUpdate(id, updateData);
    await this.repository.user.update(id, updateData);
  }
}
