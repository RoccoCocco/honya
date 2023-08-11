import { User, UserDto, UserList, UserListDto } from '@/core';

import { UserDtoFactory, UserFactory } from './user.factory';

describe(UserFactory.name, () => {
  it('shold be instance of user', () => {
    expect(new UserFactory().create(new UserDto())).toBeInstanceOf(User);
    expect(new UserFactory().update(new UserDto())).toBeInstanceOf(User);
  });
});

describe(UserDtoFactory.name, () => {
  it('shold be instance of user dto', () => {
    expect(new UserDtoFactory().toDto(new User())).toBeInstanceOf(UserDto);
  });
  it('shold be instance of user list dto', () => {
    const userList = new UserList();
    userList.items = [new User()];

    expect(new UserDtoFactory().toDto(userList)).toBeInstanceOf(UserListDto);
  });
});
