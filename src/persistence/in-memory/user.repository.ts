import { GenericList, IUserRepository, NotFoundFactory, User } from '@/core';

export class InMemoryUserRepository implements IUserRepository {
  private readonly memory = new Map<string, User>();

  constructor() {}

  async create(user: User) {
    user.id = '093411d6-0a07-4f33-a87b-c6287c6b4f41';

    this.memory.set(user.id, user);

    return user;
  }

  async delete(id: string) {
    this.memory.delete(id);
  }

  async update(id: string, data: Partial<User>) {
    const user = this.memory.get(id);

    if (!user) {
      throw NotFoundFactory.forResource({ type: 'user', id });
    }

    this.memory.set(id, { ...user, ...data });
  }

  async getAll(): Promise<GenericList<User>> {
    return { items: Array.from(this.memory.values()) };
  }

  async getById(id: string): Promise<User> {
    const user = this.memory.get(id);

    if (user) {
      return user;
    }

    throw NotFoundFactory.forResource({ type: 'user', id });
  }

  async getOneByUsername(username: string): Promise<User | null> {
    const list = Array.from(this.memory.values());
    const user = list.find((item) => item.username === username);

    return user ?? null;
  }
}
