import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { ServerError } from 'src/shared/domain/serverError';
import { IUserData } from 'src/shared/interface/userData.interface';
import { CreateAccountUseCase } from 'src/useCase/createAccount.useCase';
import { CreateAccountDTO } from './dto/createAccount.dto';

@Controller('/account')
export class AccountController {
  constructor(private readonly createAccountUseCase: CreateAccountUseCase) {}

  @Post('/create')
  @ApiBody({
    type: CreateAccountDTO,
  })
  async create(@Body() userData: IUserData, @Res() response: Response) {
    const result = await this.createAccountUseCase.execute(userData);
    if (typeof result === 'boolean') {
      return response.status(HttpStatus.OK).send({
        message: 'Account created with success!',
      });
    }
    return response.status(result.status).send({ message: result.message });
  }
}
