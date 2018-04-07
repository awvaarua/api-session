import { RestController } from '../../../common/rest/rest-controller';
import { LoggerFactory, Logger } from '../../../common/logging/logger-factory';

export class SessionController extends RestController {

    constructor() {
        super();
    }

    async create(req, res, next): Promise<any> {
        return this.respond(res, "token");
    }

}