import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { ServerError } from 'src/shared/domain/serverError';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account, prisma, transactions } from '@prisma/client';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { ITransfer } from 'src/shared/interface/transfer.interface';
import { Account } from 'src/shared/domain/account';

@Injectable()
export class TransferUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(transferProps: ITransfer): Promise<boolean> {
    const { value } = transferProps;
    const senderAccount = await this.getAccount(transferProps.senderId);
    const receiverAccount = await this.getAccount(transferProps.receiverId);
    const sender = this.removeValueOfSender(senderAccount, value);
    const receiver = this.addBalanceInReceiver(receiverAccount, value);
    return this.accountRepository
      .saveTransfer(
        AccountMapper.toEntity(sender),
        AccountMapper.toEntity(receiver),
        value,
      )
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  private async getAccount(accountId: number) {
    const accountResult = await this.accountRepository.findById(accountId);
    if (!accountResult) {
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    }
    return accountResult;
  }

  private removeValueOfSender(accountData: account, value: number): Account {
    const account = AccountMapper.toDomain(accountData);
    account.subBalance(value);
    return account;
  }

  private addBalanceInReceiver(accountData: account, value: number): Account {
    const account = AccountMapper.toDomain(accountData);
    account.addBalance(value);
    return account;
  }
}
