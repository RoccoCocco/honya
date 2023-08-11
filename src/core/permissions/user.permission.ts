import { User, UserRoleEnum, UserStatusEnum } from '../models';
import { ForbiddenExceptionFactory } from '../exceptions';

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
    if (this.isSelf(id) === false) {
      if (updateData.status !== undefined) {
        throw ForbiddenExceptionFactory.notOwner();
      }

      if (this.isAdmin() === false) {
        throw ForbiddenExceptionFactory.notAdmin();
      }
    }
  }

  private isAdmin() {
    return this.requester.role === UserRoleEnum.Admin;
  }

  private isSelf(id: string) {
    return id === this.requester.id;
  }
}
