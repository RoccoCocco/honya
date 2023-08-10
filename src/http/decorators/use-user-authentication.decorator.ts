import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ExceptionDto } from '../dto';
import { AuthenticationGuard } from '../guards';

export const USER_AUTHENTICATION = 'UserAuthentication';

export function UseUserAuthentication() {
  return applyDecorators(
    ApiBearerAuth(USER_AUTHENTICATION),
    ApiUnauthorizedResponse({ type: ExceptionDto }),
    UseGuards(AuthenticationGuard),
  );
}
