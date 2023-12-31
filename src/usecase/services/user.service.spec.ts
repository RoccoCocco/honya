import { Test } from '@nestjs/testing';

import { UserDtoMockFactory } from '@/__mocks__';
import { User, UserDto, UserList, UserListDto } from '@/core';

import { DATA_SERVICE } from '../usecase.tokens';
import { UserService } from './user.service';

const DataServiceMock = {
  user: {
    getById: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
};

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: DATA_SERVICE, useValue: DataServiceMock },
        UserService,
      ],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  describe('get', () => {
    it('should return user dto', async () => {
      DataServiceMock.user.getById.mockResolvedValueOnce(new User());
      expect(await service.get('test-id')).toBeInstanceOf(UserDto);
    });
  });

  describe('getAll', () => {
    it('should return user list dto', async () => {
      const list = new UserList();
      list.items = [new User()];
      DataServiceMock.user.getAll.mockResolvedValueOnce(list);
      expect(await service.getAll()).toBeInstanceOf(UserListDto);
    });
  });

  describe('create', () => {
    it('should create', async () => {
      DataServiceMock.user.create.mockResolvedValueOnce(new User());
      const userDataMock = UserDtoMockFactory.makeAdminUser();
      const user = await service.create(userDataMock, userDataMock);
      expect(user).toBeInstanceOf(UserDto);
    });
  });

  describe('delete', () => {
    it('should delete', async () => {
      const admin = UserDtoMockFactory.makeAdminUser();
      const author = UserDtoMockFactory.makeAuthorUser();

      DataServiceMock.user.getById.mockResolvedValueOnce(author);
      expect(await service.delete(admin, author.id)).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update', async () => {
      const userDataMock = UserDtoMockFactory.makeAdminUser();
      expect(
        await service.update(userDataMock, userDataMock.id, userDataMock),
      ).toBeUndefined();
    });
  });
});
