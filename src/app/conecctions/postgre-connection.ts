import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp: IMain = pgPromise();
const config = {
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'postgres',
    password: 'fura4468AB'
};

export class PostgreConnection {

    public static readonly DB: IDatabase<any> = pgp(config);

}