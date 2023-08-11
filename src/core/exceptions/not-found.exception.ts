export class NotFound extends Error {
  constructor(reason?: string) {
    super(reason);
  }
}

export class NotFoundFactory {
  static forResource(data: { type: string; id: string }) {
    return new NotFound(`${data.type} with ID: ${data.id} not found`);
  }
}
