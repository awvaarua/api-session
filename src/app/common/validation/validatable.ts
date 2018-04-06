import { ValidatorError } from '../../common/validation/validator-error';

export interface Validatable {
  validate(): Array<ValidatorError>;
  isValid(): boolean;
}