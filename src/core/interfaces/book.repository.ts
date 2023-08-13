import { Book } from '../models';
import {
  GenericList,
  IGenericRepository,
  QueryOptions,
} from './generic.repository';

export interface IBookRepository extends IGenericRepository<Book> {
  getAllByAuthor(
    id: string,
    queryOptions?: QueryOptions<Book>,
  ): Promise<GenericList<Book>>;
}
