import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsUUID, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class BookDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @Length(5, 200)
  title!: string;

  @ApiProperty()
  @IsUUID()
  author!: string;
}

export class BookUpdateDto extends OmitType(BookDto, ['id'] as const) {}

export class BookCreateDto extends OmitType(BookDto, ['id'] as const) {}

export class BookListDto {
  @ApiProperty({
    type: BookDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => BookDto)
  items!: Array<BookDto>;
}
