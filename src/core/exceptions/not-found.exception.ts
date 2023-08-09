export class NotFoundException extends Error {
  constructor() {
    super('Resource not found');
  }
}
