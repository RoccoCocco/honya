import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty()
  message!: string;

  @ApiProperty({ required: false })
  error?: string;

  @ApiProperty()
  statusCode!: number;
}
