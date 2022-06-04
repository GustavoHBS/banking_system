import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountUseCase } from './useCase/createAccount.useCase';
import { DepositUseCase } from './useCase/deposit.useCase';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [CreateAccountUseCase, AccountRepository, DepositUseCase],
})
export class AppModule {}
