import { FindManyOptions } from 'typeorm';

import { QueryOptions } from '@/core';

export class QueryFactory {
  static findManyQuery<E, M>(
    queryOptions?: QueryOptions<M>,
    base: FindManyOptions<E> = {},
  ): FindManyOptions<E> {
    if (queryOptions) {
      base.take = queryOptions.limit;
      base.skip = queryOptions.offset;

      if (queryOptions.sortBy) {
        base.order = {
          ...base.order,
          [queryOptions.sortBy]: queryOptions.sortOrder ?? 'asc',
        };
      }
    }

    return base;
  }
}
