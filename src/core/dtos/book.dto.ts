import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';

export class BookDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @Length(5, 200)
  title: string;

  @ApiProperty()
  @IsUUID()
  author: string;
}

export class BookUpdateDto extends OmitType(BookDto, ['id'] as const) {}

export class BookCreateDto extends OmitType(BookDto, ['id'] as const) {}
