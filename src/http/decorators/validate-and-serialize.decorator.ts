import {
  applyDecorators,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

export function ValidateAndSerialize() {
  return applyDecorators(
    UsePipes(new ValidationPipe({ transform: true, whitelist: true })),
    UseInterceptors(ClassSerializerInterceptor),
  );
}
