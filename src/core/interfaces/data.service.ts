import { IBookRepository } from './book.repository';
import { IUserRepository } from './user.repository';

export interface IDataService {
  book: IBookRepository;

  user: IUserRepository;
}
