import { HttpStatus } from '@nestjs/common';

export class InvalidParams {
  public readonly status: HttpStatus;
  public readonly param: string;
  public readonly message: string;
  constructor(param: string) {
    this.param = param;
    this.message = `The param ${param} is incorrect!`;
    this.status = HttpStatus.BAD_REQUEST;
  }
}
