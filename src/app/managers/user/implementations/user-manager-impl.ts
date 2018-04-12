import { UserManager } from '../user-manager';
import { User } from '../../../models/user';
import { UserPassword } from '../../../models/user-password';
import { UsersService } from '../../../data/data-services/users/users-service';

export class UserManagerImpl implements UserManager {

  constructor(private usersService: UsersService) {
  }

  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  async create(user: UserPassword): Promise<User> {
    return await this.usersService.create(user);
  }

  async get(id: number): Promise<User> {
    return await this.usersService.get(id);
  }

  async getByName(name: string, password: string): Promise<User> {
    return await this.usersService.getByName(name, password);
  }

  async update(id: string, user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  async delete(id: string): Promise<void> {
    return await this.usersService.delete(id);
  }
  
}