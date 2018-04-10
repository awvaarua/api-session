import { User } from '../../../models/user';
import { UsersService } from '../users-service';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import { UserPassword } from '../../../models/user-password';
import { BcryptUtils } from '../../../../utils/bcrypt-utils';

export class DbUsersService implements UsersService {

  private readonly DB: IDatabase<any>;

  constructor(db: IDatabase<any>) {
    this.DB = db;
  }

  async getAll(): Promise<Array<User>> {
    const usersData = await this.DB.any('SELECT * FROM public."user"');
    let users: Array<User> = [];
    usersData.map((user) => users.push(new User(user)));
    return users;
  };

  async get(id: number): Promise<User> {
    const userData = await this.DB.oneOrNone('SELECT * FROM public."user" WHERE id = $1', [id]);
    return userData ? new User(userData) : null;
  }

  async getByName(name: string, password: string): Promise<User> {
    const userData = await this.DB.oneOrNone('SELECT * FROM public."user" WHERE name = $1', [name]);
    if (!userData) return null;
    return await BcryptUtils.compare(password, userData.password) ? new User(userData) : null;
  }

  async create(user: UserPassword): Promise<User> {
    user.password = await BcryptUtils.hash(user.password);
    const userData = await this.DB.one('INSERT INTO public."user"(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;', [user.name, user.email, user.password]);
    return userData ? new User(userData) : null;
  }

  update(id: string, user: User): Promise<User> {
    throw "NotImp";
  }

  async delete(id: string): Promise<void> {
    await this.DB.result('DELETE FROM public."user" WHERE id = $1', [id]);
  }

}