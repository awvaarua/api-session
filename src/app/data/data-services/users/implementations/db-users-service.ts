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
    return await DbUsersService.DB.any('SELECT * FROM public."user"');
  };

  get(id: string): Promise<User> {

    DbUsersService.DB.one('SELECT * FROM public."user" WHERE ')
      .then(function (data) {
        return Promise.resolve(new User(data));
      })
      .catch(function (error) {
      });
    return Promise.resolve(null);
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