import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountRepository } from './repository/account.repository';
import { CreateAccountUseCase } from './useCase/createAccount.useCase';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [CreateAccountUseCase, AccountRepository],
})
export class AppModule {}
