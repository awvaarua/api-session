export class RefreshToken {
    constructor(public token: string, public userId: number, public expiration: Date) {
    }
}