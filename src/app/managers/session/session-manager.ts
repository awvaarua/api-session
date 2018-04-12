import { Token } from 'src/app/models/token';

export interface SessionManager {
    create(name: string, password: string): Promise<Token>;
    refreshToken(token: string): Promise<Token>;
}