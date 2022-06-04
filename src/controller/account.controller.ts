import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomHttpError } from 'src/shared/domain/error';
import { IDepositProps } from 'src/shared/interface/depositProps.interface';
import { IUserData } from 'src/shared/interface/userData.interface';
import { CreateAccountUseCase } from 'src/useCase/createAccount.useCase';
import { DepositUseCase } from 'src/useCase/deposit.useCase';
import { GetAccountBalanceUseCase } from 'src/useCase/getAccountBalance.useCase';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { DepositDTO } from './dto/deposit.dto';

@Controller('/account')
export class AccountController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase,
  ) {}

  @Post('/create')
  @ApiBody({
    type: CreateAccountDTO,
  })
  async create(@Body() userData: IUserData, @Res() response: Response) {
    const result = await this.createAccountUseCase.execute(userData);
    if (result instanceof CustomHttpError) {
      return response.status(result.status).send({ message: result.message });
    }
    return response.status(HttpStatus.OK).send({
      message: 'Account created with success!',
      accountId: result,
    });
  }

  @Post('/deposit')
  @ApiBody({
    type: DepositDTO,
  })
  async deposit(
    @Body() depositValue: IDepositProps,
    @Res() response: Response,
  ) {
    const newBalance = await this.depositUseCase.execute(depositValue);
    return response.status(HttpStatus.OK).send({
      message: 'Deposit made successfully!',
      newBalance,
    });
  }

  @Get('/balance')
  @ApiQuery({
    name: 'accountId',
    type: Number,
  })
  async getBalance(
    @Query('accountId') accountId: string,
    @Res() response: Response,
  ) {
    const balance = await this.getAccountBalanceUseCase.execute(accountId);
    return response.status(HttpStatus.OK).send({
      balance,
    });
  }
}
