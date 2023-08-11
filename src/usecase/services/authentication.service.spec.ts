import { faker } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';

import { UserDtoMockFactory } from '@/__mocks__';
import {
  AuthenticatedUserDto,
  AuthenticationSignInResponseDto,
  Unauthorized,
} from '@/core';

import { DATA_SERVICE } from '../usecase.tokens';
import { AuthenticationService } from './authentication.service';

const DataServiceMock = {
  user: {
    getOneByUsername: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  },
  passwordVault: {
    getById: jest.fn(),
  },
};

const JwtServiceMock = {
  signAsync: jest.fn(),
  verifyAsync: jest.fn(),
};

describe(AuthenticationService.name, () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        { provide: DATA_SERVICE, useValue: DataServiceMock },
        { provide: JwtService, useValue: JwtServiceMock },
        AuthenticationService,
      ],
    }).compile();

    service = moduleRef.get<AuthenticationService>(AuthenticationService);
  });

  describe('signIn', () => {
    it('should sign in', async () => {
      const password = faker.internet.password();
      const passwordHash = await hash(password, 1);
      DataServiceMock.user.getOneByUsername.mockResolvedValueOnce(
        UserDtoMockFactory.makeAdminUser(),
      );
      DataServiceMock.passwordVault.getById.mockResolvedValueOnce({
        passwordHash,
      });
      JwtServiceMock.signAsync.mockResolvedValueOnce('faker.datatype');
      expect(
        await service.signIn({
          username: faker.internet.userName(),
          password,
        }),
      ).toBeInstanceOf(AuthenticationSignInResponseDto);
    });

    it('should throw unauthorized exception', async () => {
      DataServiceMock.user.getOneByUsername.mockResolvedValueOnce(null);
      JwtServiceMock.signAsync.mockResolvedValueOnce('faker.datatype');
      expect(
        service.signIn({
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }),
      ).rejects.toThrowError(Unauthorized);
    });
  });

  describe('verify', () => {
    it('should verify', async () => {
      JwtServiceMock.verifyAsync.mockResolvedValueOnce(
        UserDtoMockFactory.makeAdminUser(),
      );
      expect(await service.verify(faker.string.alpha())).toBeInstanceOf(
        AuthenticatedUserDto,
      );
    });
  });
});
