import { User } from '../../models/user';
import { Token } from 'src/app/data/models/token';
import { RefreshToken } from '../../models/refresh-token';

export interface TokensService {
  create(user: User): Promise<Token>;
  getAndDelete(token: string): Promise<RefreshToken>;
}