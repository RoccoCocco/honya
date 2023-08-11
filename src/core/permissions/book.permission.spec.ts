import { BookDtoMockFactory, UserDtoMockFactory } from '@/__mocks__';

import { UserRoleEnum } from '../models';
import { BookPermission } from './book.permission';

describe(BookPermission.name, () => {
  describe('canDelete', () => {
    it('can delete if admin role', () => {
      const adminUser = UserDtoMockFactory.makeAdminUser();
      adminUser.role = UserRoleEnum.Admin;
      const book = BookDtoMockFactory.makeAdminBook();

      expect(() =>
        new BookPermission(adminUser).canDelete(book),
      ).not.toThrowError();
    });

    it('can delete if owner', () => {
      const authorUser = UserDtoMockFactory.makeAdminUser();
      authorUser.role = UserRoleEnum.Author;

      const book = BookDtoMockFactory.makeAdminBook();
      book.authorId = authorUser.id;

      expect(() =>
        new BookPermission(authorUser).canDelete(book),
      ).not.toThrowError();
    });

    it('should deny if not admin nor owner', () => {
      const authorUser = UserDtoMockFactory.makeAdminUser();
      authorUser.role = UserRoleEnum.Author;

      const book = BookDtoMockFactory.makeAdminBook();

      expect(() =>
        new BookPermission(authorUser).canDelete(book),
      ).toThrowError();
    });
  });

  describe('canUpdate', () => {
    it('can delete if admin role', () => {
      const adminUser = UserDtoMockFactory.makeAdminUser();
      adminUser.role = UserRoleEnum.Admin;
      const book = BookDtoMockFactory.makeAdminBook();

      expect(() =>
        new BookPermission(adminUser).canUpdate(book),
      ).not.toThrowError();
    });

    it('can delete if owner', () => {
      const authorUser = UserDtoMockFactory.makeAdminUser();
      authorUser.role = UserRoleEnum.Author;

      const book = BookDtoMockFactory.makeAdminBook();
      book.authorId = authorUser.id;

      expect(() =>
        new BookPermission(authorUser).canUpdate(book),
      ).not.toThrowError();
    });

    it('should deny if not admin nor owner', () => {
      const authorUser = UserDtoMockFactory.makeAdminUser();
      authorUser.role = UserRoleEnum.Author;

      const book = BookDtoMockFactory.makeAdminBook();

      expect(() =>
        new BookPermission(authorUser).canUpdate(book),
      ).toThrowError();
    });
  });
});
