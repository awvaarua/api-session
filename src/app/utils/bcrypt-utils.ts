const bcrypt = require('bcrypt');
const saltRounds = 10;

export class BcryptUtils {

    static async hash(plain: string): Promise<string> {
        return await bcrypt.hash(plain, saltRounds);
    }

    static async compare(plain: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(plain, hash);
    }

}