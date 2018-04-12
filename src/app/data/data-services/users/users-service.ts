import { User } from '../../../models/user';
import { UserPassword } from '../../../models/user-password';

export interface UsersService {
  getAll(): Promise<Array<User>>;
  create(user: UserPassword): Promise<User>;
  get(id: number): Promise<User>;
  getByName(name: string, password: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}