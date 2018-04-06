import { User } from '../../../models/user';
import { UsersService } from '../users-service';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'postgres',
  password: 'fura4468AB'
};

export class DbUsersService implements UsersService {

  private static readonly DB: IDatabase<any> = pgp(config);

  constructor() {

  }

  async getAll(): Promise<Array<User>> {
    const usersData = await DbUsersService.DB.any('SELECT * FROM public."user"');
    let users: Array<User> = [];
    usersData.map((user) => users.push(new User(user)));
    return users;
  };

  async get(id: number): Promise<User> {
    const userData = await DbUsersService.DB.oneOrNone('SELECT * FROM public."user" WHERE id = $1', [id]);
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