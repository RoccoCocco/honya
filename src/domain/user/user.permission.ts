import { User, UserRoleEnum, UserStatusEnum } from './user.model';
import { InsufficientPermission } from '../exceptions';

export class UserPermission {
  constructor(private readonly requester: User) {}

  canCreate(): void {
    if (this.isAdmin() === false) {
      throw new InsufficientPermission('Missing admin permissions');
    }
  }

  canDelete(target: User): void {
    if (this.isSelf(target.id)) {
      return;
    }

    if (this.isAdmin() === false) {
      throw new InsufficientPermission('Missing admin permissions');
    }

    if (target.role !== UserRoleEnum.Admin) {
      return;
    }

    if (target.status !== UserStatusEnum.Deactivated) {
      throw new InsufficientPermission('Cant delete active user');
    }
  }

  canUpdate(id: string, updateData: Partial<User>): void {
    if (this.isSelf(id)) {
      return;
    }

    if (this.isAdmin() && updateData.status !== undefined) {
      throw new InsufficientPermission('Cant deactivate other users');
    }
  }

  private isAdmin() {
    return this.requester.role === UserRoleEnum.Admin;
  }

  private isSelf(id: string) {
    return id === this.requester.id;
  }
}
