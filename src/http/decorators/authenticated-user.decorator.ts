import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthenticatedUserDto } from '@/core';

export const validateUserFromRequest = (_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: unknown }>();

  if (request.user instanceof AuthenticatedUserDto) {
    return request.user;
  }

  throw new Error('AuthenticatedUserDto not defined');
};

export const AuthenticatedUser = createParamDecorator(validateUserFromRequest);
