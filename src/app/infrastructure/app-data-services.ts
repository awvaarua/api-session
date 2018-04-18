import { UsersService } from './data-services/users/users-service';
import { DbUsersService } from './data-services/users/implementations/db-users-service';
import { PostgreConnection } from '../conecctions/postgre-connection';
import { TokensService } from './data-services/tokens/tokens-service';
import { JwtTokensService } from './data-services/tokens/implementations/jwt-tokens-service';

export class AppDataServices {
  public usersService: UsersService;
  public tokensService: TokensService;

  constructor() {
    this.usersService = new DbUsersService(PostgreConnection.DB);
    this.tokensService = new JwtTokensService(PostgreConnection.DB);
  }
}