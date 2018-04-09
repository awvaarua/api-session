import { SessionManager } from '../session-manager';
import { UsersService } from '../../../data/data-services/users/users-service';
import { TokensService } from '../../../data/data-services/tokens/tokens-service';
import { Token } from '../../../data/models/token';

export class SessionManagerImpl implements SessionManager {

    constructor(private usersService: UsersService, private tokensService: TokensService) {
    }

    async create(name: string, password: string): Promise<Token> {
        const user = await this.usersService.getByName(name, password);
        if (!user) throw 'bad_user_or_password';
        return await this.tokensService.create(user);
    }
}