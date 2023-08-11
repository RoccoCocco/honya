import { Book } from '../models';
import { IGenericRepository } from './generic.repository';

export interface IBookRepository extends IGenericRepository<Book> {}
