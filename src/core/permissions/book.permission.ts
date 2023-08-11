import { Book, User, UserRoleEnum } from '../models';

import { ForbiddenExceptionFactory } from '../exceptions';

export class BookPermission {
  constructor(private readonly requester: Partial<User>) {}

  canDelete(book: Book): void {
    if (this.isOwnerOrAdmin(book) === false) {
      throw ForbiddenExceptionFactory.notOwner();
    }
  }

  canUpdate(book: Book): void {
    if (this.isOwnerOrAdmin(book) === false) {
      throw ForbiddenExceptionFactory.notOwner();
    }
  }

  private isOwnerOrAdmin(book: Book) {
    return this.isAdmin() || this.isOwner(book);
  }

  private isAdmin() {
    return this.requester.role === UserRoleEnum.Admin;
  }

  private isOwner(book: Book) {
    return book.authorId === this.requester.id;
  }
}
