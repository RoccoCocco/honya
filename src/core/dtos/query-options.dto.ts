import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, Min, Max, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { QueryOptions } from '../interfaces';

export const QueryOptionsDtoFactory = <D>(
  sortByKeys: Array<Extract<keyof D, string>>,
): new () => QueryOptions<D> => {
  const sortOrderKeys: Array<QueryOptions<D>['sortOrder']> = ['asc', 'desc'];

  class Query implements QueryOptions<D> {
    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(1)
    @Max(25)
    @Type(() => Number)
    limit?: number;

    @ApiProperty({ example: 0 })
    @Min(0)
    @Type(() => Number)
    offset?: number;

    @ApiProperty({ enum: sortByKeys })
    @IsEnum(sortByKeys)
    sortBy?: (typeof sortByKeys)[number];

    @ApiProperty({ enum: sortOrderKeys })
    @IsEnum(sortOrderKeys)
    sortOrder?: (typeof sortOrderKeys)[number];
  }

  return PartialType(Query);
};
