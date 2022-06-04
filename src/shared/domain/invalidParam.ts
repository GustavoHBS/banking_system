import { HttpStatus } from '@nestjs/common';
import { CustomHttpError } from './error';

export class InvalidParam extends CustomHttpError {
  public readonly param: string;
  constructor(param: string, message?: string) {
    message = message || `The param ${param} is incorrect!`;
    super(message, HttpStatus.BAD_REQUEST);
    this.param = param;
  }
}
