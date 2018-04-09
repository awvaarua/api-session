import { Token } from 'src/app/data/models/token';

export interface SessionManager {
    create(name: string, password: string): Promise<Token>;
}