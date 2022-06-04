import { HttpStatus } from '@nestjs/common';

export class CustomHttpError {
  public readonly message: string;
  public readonly status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    this.message = message;
    this.status = status;
  }
}
