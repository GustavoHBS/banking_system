import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { CustomHttpError } from 'src/shared/domain/error';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { ITransfer } from 'src/shared/interface/transfer.interface';
import { IUserData } from 'src/shared/interface/userData.interface';
import { CreateAccountUseCase } from 'src/useCase/createAccount.useCase';
import { DepositUseCase } from 'src/useCase/deposit.useCase';
import { GetAccountBalanceUseCase } from 'src/useCase/getAccountBalance.useCase';
import { GetStatementUseCase } from 'src/useCase/getStatement.useCase';
import { TransferUseCase } from 'src/useCase/transfer.useCase';
import { WithdrawnUseCase } from 'src/useCase/withdrawn.useCase';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { DepositDTO } from './dto/deposit.dto';
import { TransferDTO } from './dto/transfer.dto';
import { WithdrawnDTO } from './dto/withdrawn.dto';

@Controller('/account')
export class AccountController {
  constructor(
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly depositUseCase: DepositUseCase,
    private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase,
    private readonly getStatementUseCase: GetStatementUseCase,
    private readonly transferUseCase: TransferUseCase,
    private readonly withdrawnUseCase: WithdrawnUseCase,
  ) {}

  @Post('/create')
  @ApiBody({
    type: CreateAccountDTO,
  })
  async create(@Body() userData: IUserData, @Res() response: Response) {
    const account = await this.createAccountUseCase.execute(userData);
    return response.status(HttpStatus.OK).send({
      message: 'Account created with success!',
      account,
    });
  }

  @Post('/deposit')
  @ApiBody({
    type: DepositDTO,
  })
  async deposit(
    @Body() depositValue: IAccountAndValue,
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

  @Get('/statement')
  @ApiQuery({
    name: 'accountId',
    type: Number,
  })
  async getStatement(
    @Query('accountId') accountId: string,
    @Res() response: Response,
  ) {
    const statement = await this.getStatementUseCase.execute(
      parseInt(accountId),
    );
    return response.status(HttpStatus.OK).send(statement);
  }

  @Put('/transfer')
  @ApiBody({
    type: TransferDTO,
  })
  async transfer(@Body() transfer: ITransfer, @Res() response: Response) {
    await this.transferUseCase.execute(transfer);
    return response.status(HttpStatus.OK).send({
      message: 'Transfer is success!',
    });
  }

  @Put('/withdrawn')
  @ApiBody({
    type: WithdrawnDTO,
  })
  async withdrawn(
    @Body() withdrawnDto: IAccountAndValue,
    @Res() response: Response,
  ) {
    const newBalance = await this.withdrawnUseCase.execute(withdrawnDto);
    return response.status(HttpStatus.OK).send({
      message: 'Withdrawn success!',
      newBalance,
    });
  }
}
