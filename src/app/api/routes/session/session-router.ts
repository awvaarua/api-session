import { RestRouter } from '../../../common/rest/rest-router';
import { SessionController } from './session-controller';
import { UsersService } from 'src/app/data/data-services/users/users-service';
import { TokensService } from '../../../data/data-services/tokens/tokens-service';
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
    this.router.all('/', this.wrapRouteFn(this.sessionController, this.sessionController.throwMethodNotAllowedError));
  }
}