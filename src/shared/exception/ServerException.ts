import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerException extends HttpException {
  constructor(message: string, err: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
