import { HttpStatus } from '@nestjs/common';
import { CustomHttpError } from './error';

export class InvalidParams extends CustomHttpError {
  public readonly param: string;
  constructor(param: string) {
    super(`The param ${param} is incorrect!`, HttpStatus.BAD_REQUEST);
    this.param = param;
  }
}
