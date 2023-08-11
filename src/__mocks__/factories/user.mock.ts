import { faker } from '@faker-js/faker';

import { User, UserRoleEnum, UserStatusEnum } from '@/core';

export class UserDtoMockFactory {
  static makeAdminUser() {
    const user = UserDtoMockFactory.makeAuthorUser();

    user.role = UserRoleEnum.Admin;

    return user;
  }

  static makeAuthorUser() {
    const user = new User();

    user.firstName = faker.person.firstName();
    user.id = faker.string.uuid();
    user.lastName = faker.person.lastName();
    user.role = UserRoleEnum.Author;
    user.status = UserStatusEnum.Active;
    user.username = `${user.firstName}${user.lastName}`.toLowerCase();

    return user;
  }
}
