import { RestRouter } from '../../../common/rest/rest-router';
import { UsersController } from './users-controller';
import { UsersService } from '../../../data/data-services/users/users-service';
import { UserManager } from 'src/app/managers/user/user-manager';

export class UsersRouter extends RestRouter {
  usersController: UsersController;

  constructor(userManager: UserManager) {
    super();
    this.usersController = new UsersController(userManager);
    this.initRoutes();
  }

  initRoutes() {
    //  When recive a userId param, automatically load the user
    this.router.param('userId', this.wrapParamFn(this.usersController, this.usersController.resolveUser));

    this.router.get('/', this.wrapRouteFn(this.usersController, this.usersController.getAll));
    this.router.post('/', this.wrapRouteFn(this.usersController, this.usersController.create));
    this.router.all('/', this.wrapRouteFn(this.usersController, this.usersController.throwMethodNotAllowedError));

    this.router.get('/:userId', this.wrapRouteFn(this.usersController, this.usersController.get));
    this.router.delete('/:userId', this.wrapRouteFn(this.usersController, this.usersController.delete));
    this.router.patch('/:userId', this.wrapRouteFn(this.usersController, this.usersController.update));
    this.router.all('/:userId', this.wrapRouteFn(this.usersController, this.usersController.throwMethodNotAllowedError));
  }
}