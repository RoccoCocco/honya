import { IGenericRepository } from './generic.repository';
import { User } from '../models';

export interface IUserRepository extends IGenericRepository<User> {
  getOneByUsername(username: string): Promise<User>;
}
