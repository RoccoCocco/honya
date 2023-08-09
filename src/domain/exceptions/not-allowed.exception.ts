export class InsufficientPermission extends Error {
  constructor(readonly reason: string) {
    super('Insufficient permission for this action');
  }
}
