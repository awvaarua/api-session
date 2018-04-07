import { User } from '../../models/user';
import { Token } from 'src/app/data/models/token';

export interface TokensService {
  create(user: User): Promise<Token>;
}