export enum UserRoleEnum {
  Author = 'author',
  Admin = 'admin',
}

export enum UserStatusEnum {
  Active = 'active',
  Deactivated = 'deactivated',
}

export class User {
  id = '';

  firstName = '';

  lastName = '';

  role: UserRoleEnum = UserRoleEnum.Author;

  status: UserStatusEnum = UserStatusEnum.Active;
}
