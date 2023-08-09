import { IGenericRepository } from './generic.repository';
import { Book } from '../models';

export interface IBookRepository extends IGenericRepository<Book> {}
