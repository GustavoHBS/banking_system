import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { ServerError } from 'src/shared/domain/serverError';
import { IDepositProps } from 'src/shared/interface/depositProps.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account, transactions } from '@prisma/client';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { ITransfer } from 'src/shared/interface/transfer.interface';

@Injectable()
export class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(transferProps: ITransfer): Promise<boolean> {
    const { value } = transferProps;
    const senderAccount = await this.getAccount(transferProps.senderId);
    const receiverAccount = await this.getAccount(transferProps.receiverId);
    const transaction = await this.removeValueOfSender(senderAccount, value);
    const updatedAccount = await this.addBalanceInAccount(
      receiverAccount,
      value,
      transaction,
    );
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

  private async removeValueOfSender(accountData: account, value: number) {
    const account = AccountMapper.toDomain(accountData);
    account.addBalance(value);
    await this.accountRepository
      .update(AccountMapper.toEntity(account))
      .catch((err) => {
        throw new ServerError(
          'There was an error on update balance of account',
          err,
        );
      });
    return this.createTransactionOfSender(account.id, value);
  }

  private async addBalanceInAccount(
    accountData: account,
    value: number,
    transaction: transactions,
  ) {
    const account = AccountMapper.toDomain(accountData);
    account.addBalance(value);
    await this.accountRepository
      .update(AccountMapper.toEntity(account))
      .catch((err) => {
        throw new ServerError(
          'There was an error on update balance of account',
          err,
        );
      });
  }

  private createTransactionOfSender(accountId: number, value: number) {
    return this.accountRepository.createTransaction({
      accountId,
      value: value,
      date: new Date(),
      type: TransactionType.TRANSFER,
    });
  }

  private createTransactionOfReceiver(
    accountId: number,
    value: number,
    transaction: transactions,
  ) {
    return this.accountRepository.createTransaction({
      accountId,
      value,
      date: new Date(),
      type: TransactionType.TRANSFER,
      senderId: transaction.senderId,
    });
  }
}
