import { User, UserDto, UserList, UserListDto } from '@/core';

import { UserDtoFactory, UserFactory } from './user.factory';

describe(UserFactory.name, () => {
  it('shold be instance of user', () => {
    expect(UserFactory.create(new UserDto())).toBeInstanceOf(User);
    expect(UserFactory.update(new UserDto())).toBeInstanceOf(User);
  });
});

describe(UserDtoFactory.name, () => {
  it('shold be instance of user dto', () => {
    expect(UserDtoFactory.toDto(new User())).toBeInstanceOf(UserDto);
  });
  it('shold be instance of user list dto', () => {
    const userList = new UserList();
    userList.items = [new User()];

    expect(UserDtoFactory.toDto(userList)).toBeInstanceOf(UserListDto);
  });
});
