import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountUseCase } from './useCase/createAccount.useCase';
import { DepositUseCase } from './useCase/deposit.useCase';
import { GetAccountBalanceUseCase } from './useCase/getAccountBalance.useCase';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [
    CreateAccountUseCase,
    AccountRepository,
    DepositUseCase,
    GetAccountBalanceUseCase,
  ],
})
export class AppModule {}
