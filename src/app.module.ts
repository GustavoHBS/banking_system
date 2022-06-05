import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountUseCase } from './useCase/createAccount.useCase';
import { DepositUseCase } from './useCase/deposit.useCase';
import { GetAccountBalanceUseCase } from './useCase/getAccountBalance.useCase';
import { GetStatementUseCase } from './useCase/getStatement.useCase';
import { TransferUseCase } from './useCase/transfer.useCase';
import { WithdrawnUseCase } from './useCase/withdrawn.useCase';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    AccountRepository,
    DepositUseCase,
    GetAccountBalanceUseCase,
    GetStatementUseCase,
    TransferUseCase,
    WithdrawnUseCase,
  ],
})
export class AppModule {}
