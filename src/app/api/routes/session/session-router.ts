import { RestRouter } from '../../../common/rest/rest-router';
import { SessionController } from './session-controller';

export class SessionRouter extends RestRouter {
  sessionController: SessionController;

  constructor() {
    super();
    this.sessionController = new SessionController();
    this.initRoutes();
  }

  initRoutes() {
    this.router.post('/', this.wrapRouteFn(this.sessionController, this.sessionController.create));
    this.router.all('/', this.wrapRouteFn(this.sessionController, this.sessionController.throwMethodNotAllowedError));
  }
}