import { User, UserRoleEnum, UserStatusEnum } from '../models';
import { InsufficientPermission } from '../exceptions';

export class UserPermission {
  constructor(private readonly requester: Partial<User>) {}

  canCreate(): void {
    if (this.isAdmin() === false) {
      throw new InsufficientPermission('Missing admin permissions');
    }
  }

  canDelete(target: User): void {
    if (this.isAdmin() === false) {
      throw new InsufficientPermission('Missing admin permissions');
    }

    if (
      target.role === UserRoleEnum.Admin &&
      target.status !== UserStatusEnum.Deactivated
    ) {
      throw new InsufficientPermission('Cant delete active user');
    }
  }

  canUpdate(id: string, updateData: Partial<User>): void {
    if (this.isSelf(id)) {
      return;
    }

    if (updateData.status !== undefined) {
      throw new InsufficientPermission('Cant deactivate other users');
    }

    if (this.isAdmin() === false) {
      throw new InsufficientPermission('Missing admin permissions');
    }
  }

  private isAdmin() {
    return this.requester.role === UserRoleEnum.Admin;
  }

  private isSelf(id: string) {
    return id === this.requester.id;
  }
}
