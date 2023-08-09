import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty()
  message = '';

  @ApiProperty()
  error = '';

  @ApiProperty()
  statusCode = 0;
}
