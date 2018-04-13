import { RestError } from './rest-error';

export class UnauthorizedError extends RestError {

  constructor(
    public originalError: any,
    public message: string = 'Unauthorized'
  ) {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'Unauthorized';
  }

}
