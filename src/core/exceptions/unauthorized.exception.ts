export class Unauthorized extends Error {
  constructor(reason?: string) {
    super(reason);
  }
}
