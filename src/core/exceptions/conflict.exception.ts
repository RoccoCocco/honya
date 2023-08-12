export class Conflict extends Error {
  constructor(reason?: string) {
    super(reason);
  }
}

export class ConflictExceptionFactory {
  static usernameTaken() {
    return new Conflict('Username taken');
  }
}
