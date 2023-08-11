import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, Length, ValidateNested } from 'class-validator';

import { Book } from '@/core';

import { QueryOptionsDtoFactory } from './query-options.dto';

export class BookDto implements Book {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @Length(5, 100)
  title!: string;

  @ApiProperty()
  @Length(5, 300)
  description!: string;

  @ApiProperty()
  @IsUUID()
  authorId!: string;
}

export class BookCreateDto extends OmitType(BookDto, [
  'id',
  'authorId',
] as const) {}

export class BookUpdateDto extends PartialType(BookCreateDto) {}

export class BookListDto {
  @ApiProperty({
    type: BookDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => BookDto)
  items!: Array<BookDto>;
}

export class BookQueryDto extends PartialType(
  QueryOptionsDtoFactory<BookDto>(['title']),
) {}
