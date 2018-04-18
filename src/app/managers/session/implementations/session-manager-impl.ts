import { SessionManager } from '../session-manager';
import { UsersService } from '../../../infrastructure/data-services/users/users-service';
import { TokensService } from '../../../infrastructure/data-services/tokens/tokens-service';
import { Token } from '../../../models/token';
import { RefreshToken } from '../../../models/refresh-token';
import { User } from '../../../models/user';
import { UnauthorizedError } from '../../../common/rest/errors/unauthorized-error';

export class SessionManagerImpl implements SessionManager {

    constructor(private usersService: UsersService, private tokensService: TokensService) {
    }

    async create(name: string, password: string): Promise<Token> {
        const user = await this.usersService.getByName(name, password);
        if (!user) throw new UnauthorizedError('invalid_user_or_password');
        return await this.tokensService.create(user);
    }

   async refreshToken(token: string): Promise<Token> {
       const refreshToken: RefreshToken = await this.tokensService.getAndDelete(token);
       // if refreshToken is valid...
       const user: User = await this.usersService.get(refreshToken.userId);
       return await this.tokensService.create(user);
   } 
}