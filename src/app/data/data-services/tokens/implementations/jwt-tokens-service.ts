import { TokensService } from '../tokens-service';
import { UsersService } from '../../users/users-service';
import { User } from '../../../models/user';
import { Token } from '../../../models/token';
import * as JWT from 'jsonwebtoken';
import * as randtoken from 'rand-token';

const SECRET = 'VWXED;FF&;`sBPpAN3DjWuy9V"*b3rRYOrpG{352T=>j`f`68m7&B3e1L~84wZ(';
const SECRET_REFRESH = '%qA,rv!sul;s7oOX$q7Um#;p;u[2.BR,v}e|Jo.bG@NN`XZGwj`Abnd!l+W[vQ{';

export class JwtTokensService implements TokensService {

    constructor() {
    }

    async create(user: User): Promise<Token> {
        const accesToken = await JWT.sign(user.toJSON(), SECRET, { expiresIn: 300 });
        const refreshToken = randtoken.uid(256);
        //  Save accesToken and expriation time 1 day
        return new Token(accesToken, refreshToken, 'bearer');
    }

}