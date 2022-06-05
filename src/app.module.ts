import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountUseCase } from './useCase/implementation/createAccount.useCase';
import { DepositUseCase } from './useCase/implementation/deposit.useCase';
import { GetAccountBalanceUseCase } from './useCase/implementation/getAccountBalance.useCase';
import { GetStatementUseCase } from './useCase/implementation/getStatement.useCase';
import { TransferUseCase } from './useCase/implementation/transfer.useCase';
import { WithdrawnUseCase } from './useCase/implementation/withdrawn.useCase';

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
