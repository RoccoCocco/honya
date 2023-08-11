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
  query(dto: UserQueryDto): QueryOptions<User> {
    return dto;
  }

  signUp(dto: AuthenticationSignUpDto) {
    return plainToClass(User, dto);
  }

  create(dto: UserCreateDto): User {
    return plainToClass(User, dto);
  }

  update(dto: UserUpdateDto): Partial<User> {
    return plainToClass(User, dto);
  }
}

export class UserDtoFactory {
  toDto(user: UserList): UserListDto;
  toDto(user: User): UserDto;
  toDto(user: User | UserList): UserDto | UserListDto {
    if (!('items' in user)) {
      return plainToClass(UserDto, user);
    }

    const userList = new UserListDto();
    userList.items = user.items.map((user) => plainToClass(UserDto, user));
    return userList;
  }
}
