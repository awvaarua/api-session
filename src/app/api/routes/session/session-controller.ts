import { RestController } from '../../../common/rest/rest-controller';
import { LoggerFactory, Logger } from '../../../common/logging/logger-factory';
import { UsersService } from 'src/app/data/data-services/users/users-service';
import { User } from 'src/app/data/models/user';
import { TokensService } from 'src/app/data/data-services/tokens/tokens-service';

export class SessionController extends RestController {

    constructor(private usersService: UsersService, private tokensService: TokensService) {
        super();
    }

    async create(req, res, next): Promise<any> {
        const user = await this.usersService.getByName(req.body.user, req.body.password);
        if (!user) return this.unauthorized(res, 'bad_user_or_password');
        return this.respond(res, await this.tokensService.create(user));
    }

}