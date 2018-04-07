import { RestRouter } from '../../../common/rest/rest-router';
import { SessionController } from './session-controller';
import { UsersService } from 'src/app/data/data-services/users/users-service';
import { TokensService } from '../../../data/data-services/tokens/tokens-service';

export class SessionRouter extends RestRouter {

  sessionController: SessionController;

  constructor(usersService: UsersService, tokensService: TokensService) {
    super();
    this.sessionController = new SessionController(usersService, tokensService);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.wrapRouteFn(this.sessionController, this.sessionController.create));
    this.router.all('/', this.wrapRouteFn(this.sessionController, this.sessionController.throwMethodNotAllowedError));
  }
}