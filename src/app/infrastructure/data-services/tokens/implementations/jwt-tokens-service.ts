import { TokensService } from '../tokens-service';
import { UsersService } from '../../users/users-service';
import { User } from '../../../../models/user';
import { Token } from '../../../../models/token';
import * as JWT from 'jsonwebtoken';
import * as randtoken from 'rand-token';
import { IDatabase } from 'pg-promise';
import { token } from 'morgan';
import { RefreshToken } from '../../../../models/refresh-token';
import { UnauthorizedError } from '../../../../common/rest/errors/unauthorized-error';

const SECRET = 'VWXED;FF&;`sBPpAN3DjWuy9V"*b3rRYOrpG{352T=>j`f`68m7&B3e1L~84wZ(';
const SECRET_REFRESH = '%qA,rv!sul;s7oOX$q7Um#;p;u[2.BR,v}e|Jo.bG@NN`XZGwj`Abnd!l+W[vQ{';

export class JwtTokensService implements TokensService {

    constructor(private readonly DB: IDatabase<any>) {
    }

    async create(user: User): Promise<Token> {
        const accesToken = await JWT.sign(user.toJSON(), SECRET, { expiresIn: 300 });
        const refreshToken = await this.createAndSaveRefreshToken(user);
        return new Token(accesToken, refreshToken, 'bearer');
    }

    async getAndDelete(token: string): Promise<RefreshToken> {
        const tokenData = await this.DB.oneOrNone(`DELETE FROM public.refresh_token WHERE token = $1 RETURNING *;`, [token]);
        if (!tokenData) throw new UnauthorizedError('refresh_token_not_found');
        const refreshToken = new RefreshToken(tokenData.token, tokenData.userId, tokenData.expiration);
        if (refreshToken.expiration < new Date()) throw new UnauthorizedError('refresh_token_expired');
        return refreshToken;
    }

    async createAndSaveRefreshToken(user: User): Promise<string> {
        const refreshToken = randtoken.uid(256);
        await this.DB.result('INSERT INTO public.refresh_token(token, "userId") VALUES ($1, $2);', [refreshToken, user.id]);
        return refreshToken;
    }

}