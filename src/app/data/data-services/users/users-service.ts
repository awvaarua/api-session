import { User } from '../../models/user';

export interface UsersService {
  getAll(): Promise<Array<User>>;
  create(user: User): Promise<User>;
  get(id: string): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}