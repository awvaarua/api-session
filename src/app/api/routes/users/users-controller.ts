import { User } from '../../../models/user';
import { RestController } from '../../../common/rest/rest-controller';
import { LoggerFactory, Logger } from '../../../common/logging/logger-factory';
import { UserPassword } from '../../../models/user-password';
import { UserManager } from 'src/app/managers/user/user-manager';

export class UsersController extends RestController {

  private userManager: UserManager;

  constructor(userManager: UserManager) {
    super();
    this.userManager = userManager;
  }

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  async getAll(req, res, next): Promise<any> {
    const users = await this.userManager.getAll();
    return this.respond(res, users);
  }

  async get(req, res, next): Promise<any> {
    return this.respond(res, req.user);
  }

  async create(req, res, next): Promise<any> {
    try {
      const user = new UserPassword(req.body);
      this.validateModel(user);
      return this.respond(res, await this.userManager.create(user));
    } catch (e) {
      //Known error if (e instanceof InvalidUserPassException) return this.unauthorized(res, e.message);
      return this.internalServerError(res, e);
    }
  }

  async update(req, res, next: any): Promise<any> {
    const userToUpdate: User = <User>req.user;
    userToUpdate.set(req.body);
    this.validateModel(userToUpdate);
    return this.respond(res, await this.userManager.update(userToUpdate.id, userToUpdate));
  }

  async delete(req, res, next): Promise<any> {
    await this.userManager.delete(req.user.id);
    return this.respondNoContent(res);
  }

  //  Loads user from userId parameter
  async resolveUser(req, res, next, userId: number): Promise<any> {
    const user = await this.userManager.get(userId);
    this.validateResourceFound(user);
    req.user = user;
    next();
  }
}