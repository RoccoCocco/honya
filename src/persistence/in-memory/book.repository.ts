import { IBookRepository, GenericList, Book, NotFoundFactory } from '@/core';

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

  async getAll(): Promise<GenericList<Book>> {
    return { items: Array.from(this.memory.values()) };
  }

  async getById(id: string): Promise<Book> {
    const book = this.memory.get(id);

    if (book) {
      return book;
    }

    throw NotFoundFactory.forResource({ type: 'book', id });
  }
}
