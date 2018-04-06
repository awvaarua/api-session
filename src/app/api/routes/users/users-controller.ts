import { User } from '../../../data/models/user';
import { UsersService } from '../../../data/data-services/users/users-service';
import { RestController } from '../../../common/rest/rest-controller';
import { LoggerFactory, Logger } from '../../../common/logging/logger-factory';

export class UsersController extends RestController {

  private usersService: UsersService;

  constructor(usersService: UsersService) {
    super();
    this.usersService = usersService;
  }

  private static readonly LOGGER: Logger = LoggerFactory.getLogger();

  async getAll(req, res, next): Promise<any> {
    const users = await this.usersService.getAll();
    return this.respond(res, users);
  }

  async get(req, res, next): Promise<any> {
    return this.respond(res, req.user);
  }

  async create(req, res, next): Promise<any> {
    const user = new User(req.body);
    this.validateModel(user);
    const createdUser = await this.usersService.create(user);
    return this.respond(res, createdUser);
  }

  async update(req, res, next: any): Promise<any> {
    const userToUpdate: User = <User>req.user;
    userToUpdate.set(req.body);
    this.validateModel(userToUpdate);
    const updatedUser = await this.usersService.update(userToUpdate.id, userToUpdate);
    return this.respond(res, updatedUser);
  }

  async delete(req, res, next): Promise<any> {
    await this.usersService.delete(req.user.id);
    return this.respondNoContent(res);
  }

  //  Loads user from userId parameter
  async resolveUser(req, res, next, userId: number): Promise<any> {
    const user = await this.usersService.get(userId);
    this.validateResourceFound(user);
    req.user = user;
    next();
  }
}