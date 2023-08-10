import {
  IUserRepository,
  GenericList,
  User,
  NotFoundException,
  UserRoleEnum,
} from '@/core';

export class InMemoryUserRepository implements IUserRepository {
  private readonly memory = new Map<string, User>();

  constructor() {
    const user = new User();

    user.firstName = 'Dummy';
    user.lastName = 'Dummy';
    user.username = 'dummy';
    user.role = UserRoleEnum.Admin;
    user.id = 'unknown';

    this.memory.set(user.id, user);
  }

  async create(user: User): Promise<string> {
    user.id = '093411d6-0a07-4f33-a87b-c6287c6b4f41';

    this.memory.set(user.id, user);

    return user.id;
  }

  async delete(id: string) {
    this.memory.delete(id);
  }

  async update(id: string, data: Partial<User>) {
    const user = this.memory.get(id);

    if (!user) {
      throw new NotFoundException('user', id);
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

    throw new NotFoundException('user', id);
  }

  async getOneByUsername(username: string) {
    const user = Array.from(this.memory.values()).find(
      (x) => x.username === username,
    );

    if (user) {
      return user;
    }

    throw new NotFoundException('user', username);
  }
}
