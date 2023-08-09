import { IGenericRepository } from '../common';
import { Book } from './book.model';

export interface IBookRepository extends IGenericRepository<Book> {}
