import {
  User,
  UserDto,
  UserListDto,
  UserCreateDto,
  UserUpdateDto,
  UserList,
} from '@/core';
import { plainToClass } from 'class-transformer';

export class UserFactory {
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
