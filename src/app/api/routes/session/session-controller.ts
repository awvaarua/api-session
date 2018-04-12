import { RestController } from '../../../common/rest/rest-controller';
import { LoggerFactory, Logger } from '../../../common/logging/logger-factory';
import { UsersService } from 'src/app/data/data-services/users/users-service';
import { SessionManager } from 'src/app/managers/session/session-manager';
import { InvalidUserPassException, InvalidToken } from '../../../common/exceptions/exceptions';

export class SessionController extends RestController {

    constructor(private sessionManager: SessionManager) {
        super();
    }

    async create(req, res, next): Promise<any> {
        try {
            return this.respond(res, await this.sessionManager.create(req.body.name, req.body.password));
        } catch (e) {
            if (e instanceof InvalidUserPassException) return this.unauthorized(res, e.message);
            return this.internalServerError(res, e);
        }
    }

    async refreshToken(req, res, next): Promise<any> {
        try {
            if (!req.body.refreshToken) return this.unauthorized(res, 'Must provide refresh_token');
            return this.respond(res, await this.sessionManager.refreshToken(req.body.refreshToken));
        } catch (e) {
            if (e instanceof InvalidToken) return this.unauthorized(res, e.message);
            return this.internalServerError(res, e);
        }
    }

}