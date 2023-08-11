import {
  applyDecorators,
  ClassSerializerInterceptor,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AllExceptionsFilter } from '../filters';

export function CatchSerializeAndValidate() {
  return applyDecorators(
    UsePipes(new ValidationPipe({ transform: true, whitelist: true })),
    UseInterceptors(ClassSerializerInterceptor),
    UseFilters(AllExceptionsFilter),
  );
}
