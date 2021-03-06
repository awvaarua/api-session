import { Request, Response } from 'express';
import { RestResponse } from './rest-response';
import { Validator } from '../validation/validator';
import { Validatable } from '../validation/validatable';
import { ValidatorError } from '../validation/validator-error';
import { BusinessViolationError, MethodNotAllowedError, ResourceNotFoundError,
  ValidationFailureError, ValidationFailureFactory } from './errors';

export class RestController {
  constructor() {}

  respond(res: Response, item: any | Array<any>, statusCode: number = 200): Response {
    const response = new RestResponse(item);
    return res.status(statusCode).json(response);
  }

  respondNoContent(res: Response, statusCode: number = 204): Response {
    return res.status(statusCode).json();
  }

  internalServerError(res: Response, item: any, statusCode: number = 500): Response {
    const response = new RestResponse(null, item);
    return res.status(statusCode).json(response.toJSON());
  }

  unauthorized(res: Response, item: any, statusCode: number = 401): Response {
    console.log(item);
    const response = new RestResponse(null, item);
    return res.status(statusCode).json(response.toJSON());
  }

  validateModel(model: Validatable): void {
    const validatorErrors: Array<ValidatorError> = model.validate();
    this.throwValidatorErrors(validatorErrors);
  }

  validateData(data: any, constraints: any): void {
    const validatorErrors: Array<ValidatorError> = Validator.validate(data, constraints);
    this.throwValidatorErrors(validatorErrors);
  }

  validateResourceFound(item: any) {
      if (item == null) {
        throw new ResourceNotFoundError();
      }
  }

  throwMethodNotAllowedError(req, res, next) {
    throw new MethodNotAllowedError();
  }

  throwBusinessViolation(businessViolationCode: string, message?: string) {
    throw new BusinessViolationError(businessViolationCode, message);
  }

  ////////////////////

  private throwValidatorErrors(validatorErrors: Array<ValidatorError>): void {
    if (validatorErrors == null) {
      return;
    }

    const failures = validatorErrors.map((error: ValidatorError) => {
      return ValidationFailureFactory.fromValidatorError(error);
    });

    throw new ValidationFailureError(failures);
  }
}