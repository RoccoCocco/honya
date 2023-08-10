export class NotFoundException extends Error {
  constructor(type: string, id: string) {
    super(`Resource not found: ${type} ${id}`);
  }
}
