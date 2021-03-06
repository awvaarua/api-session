import { RestRouter } from '../../../common/rest/rest-router';
import { SessionController } from './session-controller';
import { UsersService } from 'src/app/infrastructure/data-services/users/users-service';
import { TokensService } from '../../../infrastructure/data-services/tokens/tokens-service';
import { SessionManager } from '../../../managers/session/session-manager';

export class SessionRouter extends RestRouter {

  sessionController: SessionController;

  constructor(sessionManger: SessionManager) {
    super();
    this.sessionController = new SessionController(sessionManger);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.wrapRouteFn(this.sessionController, this.sessionController.create));
    this.router.post('/refreshToken', this.wrapRouteFn(this.sessionController, this.sessionController.refreshToken));
    this.router.all('/', this.wrapRouteFn(this.sessionController, this.sessionController.throwMethodNotAllowedError));
  }
}