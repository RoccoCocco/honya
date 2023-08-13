import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';

import { QueryOptions, SortOrder, sortOrderValues } from '../interfaces';

export const QueryOptionsDtoFactory = <D>(
  sortByKeys: Array<Extract<keyof D, string>>,
): new () => QueryOptions<D> => {
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

    @ApiProperty({ enum: sortOrderValues })
    @IsEnum(sortOrderValues)
    sortOrder?: SortOrder;
  }

  return PartialType(Query);
};
