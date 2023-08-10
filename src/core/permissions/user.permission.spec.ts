import { UserRoleEnum, UserStatusEnum } from '../models';

import { UserPermission } from './user.permission';

import { UserDtoMockFactory } from '@/__mocks__';

describe(UserPermission.name, () => {
  describe('canCreate', () => {
    it('can delete if admin role', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Admin;

      expect(() => new UserPermission(user).canCreate()).not.toThrowError();
    });

    it('cant delete if not an admin role', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Author;

      expect(() => new UserPermission(user).canCreate()).toThrowError();
    });
  });

  describe('canDelete', () => {
    it('should not allow if not admin', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Author;

      expect(() => new UserPermission(user).canDelete(user)).toThrowError();
    });

    it('should allow if admin', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Admin;
      const author = UserDtoMockFactory.makeAdminUser();
      author.role = UserRoleEnum.Author;

      expect(() =>
        new UserPermission(user).canDelete(author),
      ).not.toThrowError();
    });

    it('should not allow if deleting active admin', () => {
      const admin = UserDtoMockFactory.makeAdminUser();
      admin.role = UserRoleEnum.Admin;
      const activeAdmin = UserDtoMockFactory.makeAdminUser();
      activeAdmin.role = UserRoleEnum.Admin;
      activeAdmin.status = UserStatusEnum.Active;

      expect(() =>
        new UserPermission(admin).canDelete(activeAdmin),
      ).toThrowError();
    });

    it('should allow if deleting deactivated admin', () => {
      const admin = UserDtoMockFactory.makeAdminUser();
      admin.role = UserRoleEnum.Admin;
      const inactiveAdmin = UserDtoMockFactory.makeAdminUser();
      inactiveAdmin.role = UserRoleEnum.Admin;
      inactiveAdmin.status = UserStatusEnum.Deactivated;

      expect(() =>
        new UserPermission(admin).canDelete(inactiveAdmin),
      ).not.toThrowError();
    });
  });

  describe('canUpdate', () => {
    it('can update if self', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Author;

      expect(() =>
        new UserPermission(user).canUpdate(user.id, user),
      ).not.toThrowError();
    });

    it('can update if admin', () => {
      const admin = UserDtoMockFactory.makeAdminUser();
      admin.role = UserRoleEnum.Admin;
      const author = UserDtoMockFactory.makeAdminUser();

      expect(() =>
        new UserPermission(admin).canUpdate(author.id, {}),
      ).not.toThrowError();
    });

    it('cant update if not admin', () => {
      const user = UserDtoMockFactory.makeAdminUser();
      user.role = UserRoleEnum.Author;
      const author = UserDtoMockFactory.makeAdminUser();

      expect(() =>
        new UserPermission(user).canUpdate(author.id, {}),
      ).toThrowError();
    });

    it('cant change status if not self', () => {
      const admin = UserDtoMockFactory.makeAdminUser();
      admin.role = UserRoleEnum.Admin;
      const author = UserDtoMockFactory.makeAdminUser();

      expect(() =>
        new UserPermission(admin).canUpdate(author.id, {
          status: UserStatusEnum.Deactivated,
        }),
      ).toThrowError();
    });
  });
});
