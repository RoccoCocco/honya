import {
  ArgumentsHost,
  Catch,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { Forbidden, NotFound, Unauthorized } from '@/core';

const exceptionMapping = [
  [Forbidden, ForbiddenException],
  [Unauthorized, UnauthorizedException],
  [NotFound, NotFoundException],
] as const;

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    for (const [FromError, ToException] of exceptionMapping) {
      if (exception instanceof FromError) {
        return super.catch(new ToException(exception.message), host);
      }
    }

    super.catch(exception, host);
  }
}
