import { TokensService } from '../tokens-service';
import { UsersService } from '../../users/users-service';
import { User } from '../../../models/user';
import { Token } from '../../../models/token';
import * as JWT from 'jsonwebtoken';
import * as randtoken from 'rand-token';

const SECRET = '8284224EAEA6F888BD65D958FDE47B1BDA8D971744522D412113F44483';

export class JwtTokensService implements TokensService {

    constructor() {
    }

    async create(user: User): Promise<Token> {
        const accesToken = await JWT.sign(user.toJSON(), SECRET, { expiresIn: 300 });
        console.log(randtoken.uid(256));
        return new Token(accesToken, randtoken.uid(256), 'bearer');
    }

}