import { User } from '../../../models/user';
import { Token } from '../../../models/token';
import { RefreshToken } from '../../../models/refresh-token';

export interface TokensService {
  create(user: User): Promise<Token>;
  getAndDelete(token: string): Promise<RefreshToken>;
}