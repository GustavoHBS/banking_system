import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { ServerException } from 'src/shared/exception/ServerException';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account } from '@prisma/client';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { IDepositUseCase } from '../depositUseCase.interface';
import { IAccountRepository } from 'src/repository/accountRepository.interface';

@Injectable()
export class DepositUseCase implements IDepositUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(depositProps: IAccountAndValue): Promise<number> {
    const { accountId, value } = depositProps;
    const account = await this.getAccount(accountId);
    const updatedAccount = await this.addBalanceInAccount(account, value);
    await this.createDepositTransaction(accountId, value);
    return updatedAccount.balance.toNumber();
  }

  private async getAccount(accountId: number) {
    const accountResult = await this.accountRepository.findById(accountId);
    if (!accountResult) {
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    }
    return accountResult;
  }

  private async addBalanceInAccount(accountData: account, value: number) {
    const account = AccountMapper.toDomain(accountData);
    account.addBalance(value);
    return this.accountRepository
      .update(AccountMapper.toEntity(account))
      .catch((err) => {
        throw new ServerException(
          'There was an error on update balance of account',
          err,
        );
      });
  }

  private createDepositTransaction(accountId: number, depositValue: number) {
    return this.accountRepository.createTransaction({
      accountId,
      value: depositValue,
      date: new Date(),
      type: TransactionType.DEPOSIT,
    });
  }
}
