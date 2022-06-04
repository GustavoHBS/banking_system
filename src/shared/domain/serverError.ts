import { HttpStatus } from '@nestjs/common';
import { CustomHttpError } from './error';

export class ServerError extends CustomHttpError {
  constructor(message: string, err) {
    console.error(err);
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
