import { IGenericRepository } from '../common';
import { User } from './user.model';

export interface IUserRepository extends IGenericRepository<User> {}
