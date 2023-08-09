import { IBookRepository, Book } from '@/core';

export class InMemoryBookRepository implements IBookRepository {
  private readonly memory = new Map<string, Book>();

  async create(user: Book): Promise<string> {
    const id = new Date().getTime().toString();

    this.memory.set(id, user);

    return id;
  }

  async delete(id: string) {
    this.memory.delete(id);
  }

  async update(id: string, data: Partial<Book>) {
    const user = this.memory.get(id);

    if (user) {
      this.memory.set(id, { ...user, ...data });
    }
  }

  async getAll(): Promise<Array<Book>> {
    return Array.from(this.memory.values());
  }

  async getById(id: string): Promise<Book> {
    return this.memory.get(id);
  }
}
