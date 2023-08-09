import { IBookRepository } from './book';
import { IUserRepository } from './user';

export interface IDataService {
  book: IBookRepository;

  user: IUserRepository;
}
