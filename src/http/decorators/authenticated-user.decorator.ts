import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUserDto } from '@/core';

export const AuthenticatedUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const { user } = ctx
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUserDto }>();

    if (user instanceof AuthenticatedUserDto) {
      return user;
    }

    throw new Error('AuthenticatedUserDto not defined');
  },
);
