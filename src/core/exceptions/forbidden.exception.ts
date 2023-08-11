export class Forbidden extends Error {
  constructor(reason?: string) {
    super(reason);
  }
}

export class ForbiddenExceptionFactory {
  static notOwner() {
    return new Forbidden('Not an owner');
  }

  static notAdmin() {
    return new Forbidden('Not a admin');
  }

  static isActiveUser() {
    return new Forbidden('User is active');
  }
}
