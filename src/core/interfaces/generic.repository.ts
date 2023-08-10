export interface GenericList<D> {
  items: Array<D>;
}

export interface IGenericRepository<T> {
  create(data: T): Promise<string>;

  delete(id: string): Promise<void>;

  getAll(): Promise<GenericList<T>>;

  getById(id: string): Promise<T>;

  update(id: string, data: Partial<T>): Promise<void>;
}
