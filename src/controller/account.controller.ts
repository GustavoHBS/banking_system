import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { ITransfer } from 'src/shared/interface/transfer.interface';
import { IUserData } from 'src/shared/interface/userData.interface';
import { ICreateAccountUseCase } from 'src/useCase/createAccountUseCase.interface';
import { IDepositUseCase } from 'src/useCase/depositUseCase.interface';
import { IGetAccountBalanceUseCase } from 'src/useCase/getAccountBalanceUseCase.interface';
import { IGetStatementUseCase } from 'src/useCase/getStatementUseCase.interface';
import { CreateAccountUseCase } from 'src/useCase/implementation/createAccount.useCase';
import { DepositUseCase } from 'src/useCase/implementation/deposit.useCase';
import { GetAccountBalanceUseCase } from 'src/useCase/implementation/getAccountBalance.useCase';
import { GetStatementUseCase } from 'src/useCase/implementation/getStatement.useCase';
import { TransferUseCase } from 'src/useCase/implementation/transfer.useCase';
import { WithdrawnUseCase } from 'src/useCase/implementation/withdrawn.useCase';
import { ITransferUseCase } from 'src/useCase/transferUseCase.interface';
import { IWithdrawnUseCase } from 'src/useCase/withdrawnUseCase.interface';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { DepositDTO } from './dto/deposit.dto';
import { TransferDTO } from './dto/transfer.dto';
import { WithdrawnDTO } from './dto/withdrawn.dto';

@Controller('/account')
export class AccountController {
  constructor(
    @Inject(CreateAccountUseCase)
    private readonly createAccountUseCase: ICreateAccountUseCase,
    @Inject(DepositUseCase)
    private readonly depositUseCase: IDepositUseCase,
    @Inject(GetAccountBalanceUseCase)
    private readonly getAccountBalanceUseCase: IGetAccountBalanceUseCase,
    @Inject(GetStatementUseCase)
    private readonly getStatementUseCase: IGetStatementUseCase,
    @Inject(TransferUseCase)
    private readonly transferUseCase: ITransferUseCase,
    @Inject(WithdrawnUseCase)
    private readonly withdrawnUseCase: IWithdrawnUseCase,
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
