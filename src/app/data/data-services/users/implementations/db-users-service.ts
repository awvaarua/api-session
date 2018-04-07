import { User } from '../../../models/user';
import { UsersService } from '../users-service';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

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

  async getByNameAndPass(name: string, password: string): Promise<User> {
    const userData = await this.DB.oneOrNone('SELECT * FROM public."user" WHERE name = $1 AND password = $2', [name, password]);
    return userData ? new User(userData) : null;
  }

  create(user: User): Promise<User> {
    throw "NotImp";
  }

  update(id: string, user: User): Promise<User> {
    throw "NotImp";
  }

  delete(id: string): Promise<void> {
    throw "NotImp";
  }

}