import { IBookRepository } from './book.repository';
import { IUserRepository } from './user.repository';
import { IPasswordVaultRepository } from './password-vault.repository';

export interface IDataService {
  book: IBookRepository;
  passwordVault: IPasswordVaultRepository;
  user: IUserRepository;
}
