import { SessionManager } from "./session/session-manager";
import { SessionManagerImpl } from './session/implementations/session-manager-impl';
import { AppDataServices } from '../infrastructure/app-data-services';
import { UserManager } from 'src/app/managers/user/user-manager';
import { UserManagerImpl } from './user/implementations/user-manager-impl';

export class AppManagers {

    public sessionManager: SessionManager;
    public userManager: UserManager;

    constructor(appDataServices: AppDataServices) {
        this.sessionManager = new SessionManagerImpl(appDataServices.usersService, appDataServices.tokensService);
        this.userManager = new UserManagerImpl(appDataServices.usersService);
    }
}