import { IGenericRepository } from './generic.repository';
import { PasswordVault } from '../models';

export interface IPasswordVaultRepository
  extends IGenericRepository<PasswordVault> {}
