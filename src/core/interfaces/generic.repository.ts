export interface GenericList<D> {
  items: Array<D>;
}

export type QueryOptions<T> = {
  limit?: number;
  offset?: number;
  sortBy?: Extract<keyof T, string>;
  sortOrder?: 'asc' | 'desc';
};

export interface IGenericRepository<T> {
  create(data: T): Promise<string>;

  delete(id: string): Promise<void>;

  getAll(queryOptions?: QueryOptions<T>): Promise<GenericList<T>>;

  getById(id: string): Promise<T>;

  update(id: string, data: Partial<T>): Promise<void>;
}
