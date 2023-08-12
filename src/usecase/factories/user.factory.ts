import { plainToClass } from 'class-transformer';

import {
  AuthenticationSignUpDto,
  QueryOptions,
  User,
  UserCreateDto,
  UserDto,
  UserList,
  UserListDto,
  UserQueryDto,
  UserUpdateDto,
} from '@/core';

export class UserFactory {
  static query(dto: UserQueryDto): QueryOptions<User> {
    return dto;
  }

  static signUp(dto: AuthenticationSignUpDto) {
    return plainToClass(User, dto);
  }

  static create(dto: UserCreateDto): User {
    return plainToClass(User, dto);
  }

  static update(dto: UserUpdateDto): Partial<User> {
    return plainToClass(User, dto);
  }
}

export class UserDtoFactory {
  static toDto(user: UserList): UserListDto;
  static toDto(user: User): UserDto;
  static toDto(user: User | UserList): UserDto | UserListDto {
    if (!('items' in user)) {
      const dto = new UserDto();

      dto.firstName = user.firstName;
      dto.id = user.id;
      dto.lastName = user.lastName;
      dto.role = user.role;
      dto.status = user.status;
      dto.username = user.username;

      return dto;
    }

    const userList = new UserListDto();
    userList.items = user.items.map((user) => this.toDto(user));

    return userList;
  }
}
