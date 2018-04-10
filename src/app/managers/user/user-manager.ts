import { User } from '../../data/models/user';
import { UserPassword } from '../../data/models/user-password';

export interface UserManager {
  getAll(): Promise<Array<User>>;
  create(user: UserPassword): Promise<User>;
  get(id: number): Promise<User>;
  getByName(name: string, password: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}