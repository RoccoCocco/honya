import {
  applyDecorators,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseFilters,
} from '@nestjs/common';

import { AllExceptionsFilter } from '../filters';

export function CatchSerializeAndValidate() {
  return applyDecorators(
    UsePipes(new ValidationPipe({ transform: true, whitelist: true })),
    UseInterceptors(ClassSerializerInterceptor),
    UseFilters(AllExceptionsFilter),
  );
}
