import { User } from '../models';
import { IGenericRepository } from './generic.repository';

export interface IUserRepository extends IGenericRepository<User> {
  getOneByUsername(username: string): Promise<User | null>;
}
