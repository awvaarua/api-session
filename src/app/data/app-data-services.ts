import { UsersService } from './data-services/users/users-service';
import { MockUsersService } from './data-services/users/implementations/mock-users-service';
import { MOCK_USERS } from './mock-data/mock-users';

export class AppDataServices {
  public usersService: UsersService;

  constructor(useMock = true) {
    if (useMock) {
      this.initMockDataServices();
    }
  }

  private initMockDataServices() {
    this.usersService = new MockUsersService(MOCK_USERS);
  }
}