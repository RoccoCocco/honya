import { PasswordVault } from '../models';
import { IGenericRepository } from './generic.repository';

export interface IPasswordVaultRepository
  extends IGenericRepository<PasswordVault> {}
