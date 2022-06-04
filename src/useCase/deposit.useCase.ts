import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { ServerError } from 'src/shared/domain/serverError';
import { IDepositProps } from 'src/shared/interface/depositProps.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account } from '@prisma/client';
import { TransactionType } from 'src/shared/enum/transactionType.enum';

@Injectable()
export class DepositUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(depositProps: IDepositProps): Promise<number> {
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
        throw new ServerError('There was an error creating an account', err);
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
