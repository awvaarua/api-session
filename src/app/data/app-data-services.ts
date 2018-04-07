import { UsersService } from './data-services/users/users-service';
import { DbUsersService } from './data-services/users/implementations/db-users-service';
import { PostgreConnection } from '../conecctions/postgre-connection';

export class AppDataServices {
  public usersService: UsersService;

  constructor(useMock = true) {
    if (useMock) {
      this.initMockDataServices();
    }
  }

  private initMockDataServices() {
    this.usersService = new DbUsersService(PostgreConnection.DB);
  }
}