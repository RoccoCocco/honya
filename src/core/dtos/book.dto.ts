import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Book } from '@/core';

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

export class BookUpdateDto extends OmitType(BookDto, [
  'id',
  'authorId',
] as const) {}

export class BookCreateDto extends OmitType(BookDto, [
  'id',
  'authorId',
] as const) {}

export class BookListDto {
  @ApiProperty({
    type: BookDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => BookDto)
  items!: Array<BookDto>;
}
