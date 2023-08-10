import { GenericList } from '../interfaces';

export enum UserRoleEnum {
  Author = 'author',
  Admin = 'admin',
}

export enum UserStatusEnum {
  Active = 'active',
  Deactivated = 'deactivated',
}

export class User {
  id!: string;

  username!: string;

  firstName!: string;

  lastName!: string;

  role!: UserRoleEnum;

  status!: UserStatusEnum;
}

export class UserList implements GenericList<User> {
  items!: Array<User>;
}
