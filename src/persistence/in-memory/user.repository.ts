import { IUserRepository, User, NotFoundException } from '@/core';

export class InMemoryUserRepository implements IUserRepository {
  private readonly memory = new Map<string, User>();

  async create(user: User): Promise<string> {
    const id = new Date().getTime().toString();

    this.memory.set(id, user);

    return id;
  }

  async delete(id: string) {
    this.memory.delete(id);
  }

  async update(id: string, data: Partial<User>) {
    const user = this.memory.get(id);

    if (user) {
      this.memory.set(id, { ...user, ...data });
    }
  }

  async getAll(): Promise<Array<User>> {
    return Array.from(this.memory.values());
  }

  async getById(id: string): Promise<User> {
    const user = this.memory.get(id);

    if (user) {
      return user;
    }

    throw new NotFoundException();
  }
}
