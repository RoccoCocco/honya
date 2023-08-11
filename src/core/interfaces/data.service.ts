import { IBookRepository } from './book.repository';
import { IPasswordVaultRepository } from './password-vault.repository';
import { IUserRepository } from './user.repository';

export interface IDataService {
  book: IBookRepository;
  passwordVault: IPasswordVaultRepository;
  user: IUserRepository;
}
