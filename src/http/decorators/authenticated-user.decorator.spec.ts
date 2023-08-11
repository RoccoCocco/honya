import { ExecutionContext } from '@nestjs/common';

import { AuthenticatedUserDto } from '@/core';

import {
  AuthenticatedUser,
  validateUserFromRequest,
} from './authenticated-user.decorator';

const getRequest = jest.fn();

const ExecutionContextMock = {
  switchToHttp() {
    return { getRequest };
  },
} as unknown as ExecutionContext;

describe(AuthenticatedUser.name, () => {
  it('should be function', () => {
    expect(AuthenticatedUser()).toBeInstanceOf(Function);
  });

  it('should check response', () => {
    getRequest.mockReturnValueOnce({ user: new AuthenticatedUserDto() });
    expect(validateUserFromRequest({}, ExecutionContextMock)).toBeInstanceOf(
      AuthenticatedUserDto,
    );
  });

  it('should throw on invalid user data', () => {
    getRequest.mockReturnValueOnce({});
    expect(() =>
      validateUserFromRequest({}, ExecutionContextMock),
    ).toThrowError();
  });
});
