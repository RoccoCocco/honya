import { Book, User, UserRoleEnum } from '../models';

import { InsufficientPermission } from '../exceptions';

const NOT_AN_OWNER_MESSAGE = 'Not an owner';

export class BookPermission {
  constructor(private readonly requester: User) {}

  canDelete(book: Book): void {
    if (this.isOwnerOrAdmin(book) === false) {
      throw new InsufficientPermission(NOT_AN_OWNER_MESSAGE);
    }
  }

  canUpdate(book: Book): void {
    if (this.isOwnerOrAdmin(book) === false) {
      throw new InsufficientPermission(NOT_AN_OWNER_MESSAGE);
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
