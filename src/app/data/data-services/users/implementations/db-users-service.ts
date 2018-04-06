import { User } from '../../../models/user';
import { UsersService } from '../users-service';
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise();
const config = {
  host: 'pgc.development.corp.logitravelgroup.com',
  port: 5432,
  database: 'calculator',
  user: 'sebastian.sanso',
  password: 'Serviette90***'
};

export class DbUsersService implements UsersService {

  private static readonly DB: IDatabase<any> = pgp(config);

  constructor() {
    
  }

  getAll(): Promise<Array<User>> {
    throw "NotImp";
  };

  get(id: string): Promise<User> {

    DbUsersService.DB.one('SELECT id, "firstName", email FROM "user" where id = 1;')
      .then(function(data) {
        return Promise.resolve(new User(data));
      })
      .catch(function(error) {
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