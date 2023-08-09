import { User, UserDto, UserCreateDto, UserUpdateDto } from '@/core';
import { plainToClass } from 'class-transformer';

export class UserFactory {
  create(dto: UserCreateDto): User {
    return plainToClass(User, dto);
  }

  update(dto: UserUpdateDto): Partial<User> {
    return plainToClass(User, dto);
  }

  // TODO move this in another factory
  toDto(user: User): UserDto {
    return plainToClass(UserDto, user);
  }
}
