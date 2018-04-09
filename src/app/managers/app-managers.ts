import { SessionManager } from "./session/session-manager";
import { SessionManagerImpl } from 'src/app/managers/session/implementations/session-manager-impl';
import { AppDataServices } from 'src/app/data/app-data-services';

export class AppManagers {

    public sessionManager: SessionManager;

    constructor(appDataServices: AppDataServices) {
        this.sessionManager = new SessionManagerImpl(appDataServices.usersService, appDataServices.tokensService);
    }
}