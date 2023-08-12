import { ForbiddenExceptionFactory } from '../exceptions';
import { User, UserRoleEnum, UserStatusEnum } from '../models';

export class UserPermission {
  constructor(private readonly requester: Partial<User>) {}

  canCreate(): void {
    if (this.isAdmin() === false) {
      throw ForbiddenExceptionFactory.notAdmin();
    }
  }

  canDelete(target: User): void {
    if (this.isAdmin() === false) {
      throw ForbiddenExceptionFactory.notAdmin();
    }

    if (
      target.role === UserRoleEnum.Admin &&
      target.status !== UserStatusEnum.Deactivated
    ) {
      throw ForbiddenExceptionFactory.isActiveUser();
    }
  }

  canUpdate(id: string, updateData: Partial<User>): void {
    if (this.isSelf(id)) {
      if (updateData.role !== undefined && !this.isAdmin()) {
        throw ForbiddenExceptionFactory.notAdmin();
      }

      return;
    }

    if (this.isAdmin() === false) {
      throw ForbiddenExceptionFactory.notAdmin();
    }

    if (updateData.status !== undefined) {
      throw ForbiddenExceptionFactory.notOwner();
    }
  }

  private isAdmin() {
    return this.requester.role === UserRoleEnum.Admin;
  }

  private isSelf(id: string) {
    return id === this.requester.id;
  }
}
