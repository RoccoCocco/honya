import { Book, GenericList, IBookRepository, NotFoundFactory } from '@/core';

export class InMemoryBookRepository implements IBookRepository {
  private readonly memory = new Map<string, Book>();

  async create(book: Book) {
    book.id = new Date().getTime().toString();

    this.memory.set(book.id, book);

    return book;
  }

  async delete(id: string) {
    this.memory.delete(id);
  }

  async update(id: string, data: Partial<Book>) {
    const book = this.memory.get(id);

    if (book) {
      this.memory.set(id, { ...book, ...data });
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
