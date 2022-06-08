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
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
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
import { CreateAccountResponseDTO } from './dto/createAccountResponse.dto';
import { DepositDTO } from './dto/deposit.dto';
import { DepositResponseDTO } from './dto/depositResponse.dto';
import { GetBalanceResponseDTO } from './dto/getBalanceResponse.dto';
import { GetStatementResponseDTO } from './dto/getStatementResponse.dto';
import { TransferDTO } from './dto/transfer.dto';
import { transferResponseDTO } from './dto/transferResponse.dto';
import { WithdrawnDTO } from './dto/withdrawn.dto';
import { WithdrawnResponseDTO } from './dto/withdrawnResponse.dto';

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
  @ApiOperation({
    description: 'Route to create a new account',
    summary: 'Create Account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateAccountResponseDTO,
  })
  async create(@Body() userData: CreateAccountDTO, @Res() response: Response) {
    const account = await this.createAccountUseCase.execute(userData);
    return response.status(HttpStatus.CREATED).send({
      message: 'Account created with success!',
      account,
    });
  }

  @Post('/deposit')
  @ApiOperation({
    description: 'Route to make a deposit in account',
    summary: 'Deposit',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DepositResponseDTO,
  })
  async deposit(@Body() depositValue: DepositDTO, @Res() response: Response) {
    const newBalance = await this.depositUseCase.execute(depositValue);
    return response.status(HttpStatus.OK).send({
      message: 'Deposit made successfully!',
      newBalance,
    });
  }

  @Get('/balance')
  @ApiOperation({
    description: 'Route to recover balance of account',
    summary: 'Balance',
  })
  @ApiQuery({
    name: 'accountId',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetBalanceResponseDTO,
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
  @ApiOperation({
    description: 'Route to recover all transactions of account',
    summary: 'Statement',
  })
  @ApiQuery({
    name: 'accountId',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetStatementResponseDTO,
    isArray: true,
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
  @ApiOperation({
    description: 'Route to transfer money between account',
    summary: 'Transfer money',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: transferResponseDTO,
  })
  async transfer(@Body() transfer: TransferDTO, @Res() response: Response) {
    await this.transferUseCase.execute(transfer);
    return response.status(HttpStatus.OK).send({
      message: 'Transfer has been success!',
    });
  }

  @Put('/withdrawn')
  @ApiOperation({
    description: 'Route to withdrawn money of account',
    summary: 'Withdrawn',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: WithdrawnResponseDTO,
  })
  async withdrawn(
    @Body() withdrawnDTO: WithdrawnDTO,
    @Res() response: Response,
  ) {
    const newBalance = await this.withdrawnUseCase.execute(withdrawnDTO);
    return response.status(HttpStatus.OK).send({
      message: 'Withdrawn success!',
      newBalance,
    });
  }
}
