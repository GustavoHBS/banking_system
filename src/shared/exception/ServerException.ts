import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ServerException extends HttpException {
  constructor(message: string, err: any) {
    Logger.error(err);
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
