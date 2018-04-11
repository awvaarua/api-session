export class InvalidUserPassException extends Error {
    constructor (message?: string) {
        super(message || 'Invalid user or password');
    }
}

export class InvalidToken extends Error {
    constructor (message?: string) {
        super(message || 'Invalid Token');
    }
}

export class AnotherException extends Error {
    constructor (message?: string) {
        super(message || 'Invalid user or password');
    }
}