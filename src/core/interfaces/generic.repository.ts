export interface GenericList<D> {
  items: Array<D>;
}

export const sortOrderValues = ['asc', 'desc'] as const;

export type SortOrder = (typeof sortOrderValues)[number];

export type QueryOptions<T> = {
  limit?: number;
  offset?: number;
  sortBy?: Extract<keyof T, string>;
  sortOrder?: SortOrder;
};

export interface IGenericRepository<T> {
  create(data: T): Promise<string>;

  delete(id: string): Promise<void>;

  getAll(queryOptions?: QueryOptions<T>): Promise<GenericList<T>>;

  getById(id: string): Promise<T | null>;

  update(id: string, data: Partial<T>): Promise<void>;
}
