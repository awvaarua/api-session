import { Model } from './model';
import { Validator } from '../../common/validation/validator';
import { ValidatorError } from '../../common/validation/validator-error';
import { Validatable } from '../../common/validation/validatable';

export class User extends Model implements Validatable {

  public name: string;
  public email: string;
  public password: string;

  constructor(data: any) {
    super(data.id);
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  validate(): Array<ValidatorError> {
    return Validator.validate(this, User.MODEL_CONSTRAINTS);
  }

  isValid() { return this.validate() === undefined; }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    };
  }

  static readonly MODEL_CONSTRAINTS: any = {
    name: {
      required: true,
      notNull: true,
      length: {
        minimum: 2,
        message: 'must be at least 2 characters.'
      }
    },
    password: {
      required: true,
      notNull: true,
      length: {
        minimum: 2,
        message: 'must be at least 2 characters.'
      }
    },
    email: {
      required: true,
      notNull: true,
      email: {
        message: 'must be a valid email address.'
      }
    }
  };
}
