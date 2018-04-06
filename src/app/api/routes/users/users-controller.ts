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
    try {
      let users = await this.usersService.getAll();
      console.log(users);
      return this.respond(res, users);
    } catch (err) {
      UsersController.LOGGER.error(err);
      return this.internalServerError(res, err);
    }
  }

  get(req, res, next): any {
    return this.respond(res, req.user);
  }

  create(req, res, next): Promise<any> {
    const user = new User(req.body);
    this.validateModel(user);

    if (user.email === 'andre@andregiannico.com') {
      this.throwBusinessViolation('BLACKLISTED_EMAIL', 'This email is blacklisted.');
    }

    return this.usersService.create(user)
      .then((user: User) => {
        return this.respond(res, user);
      });
  }

  update(req, res, next: any): Promise<any> {
    const userToUpdate: User = (<User> req.user);
    userToUpdate.set(req.body);
    this.validateModel(userToUpdate);

    return this.usersService.update(userToUpdate.id, userToUpdate)
      .then((updatedUser: User) => {
        return this.respond(res, updatedUser);
      });
  }

  delete(req, res, next): Promise<any> {
    return this.usersService.delete(req.user.id)
      .then(() => {
        return this.respondNoContent(res);
      });
  }

  resolveUser(req, res, next, userId: string): Promise<any> {
    return this.usersService.get(userId)
      .then((user: User) => {
        this.validateResourceFound(user);
        req.user = user;
        next();
      });
  }
}