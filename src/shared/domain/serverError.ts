import { HttpStatus } from '@nestjs/common';

export class ServerError {
  public readonly message: string;
  public readonly status: HttpStatus;

  constructor(message: string, err: any) {
    this.message = message;
    this.status = HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
