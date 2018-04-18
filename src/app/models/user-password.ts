import { User } from './user';

export class UserPassword extends User {

  public password: string;

  constructor(data: any) {
    super(data);
    this.password = data.password;
  }

  isValid() { return this.validate() === undefined; }

  toJSON(): any {
    let json = super.toJSON();
    json.password = this.password;
    return json;
  }
}
