import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Account } from 'src/shared/domain/account';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { ITransaction } from 'src/shared/interface/transaction.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';

@Injectable()
export class AccountRepository {
  private repository: PrismaClient;
  constructor() {
    this.repository = new PrismaClient();
  }
  async create(account: IAccount) {
    return this.repository.account.create({
      data: account,
    });
  }

  findById(id: number) {
    return this.repository.account.findUnique({
      where: {
        id,
      },
    });
  }

  update(account: IAccount) {
    return this.repository.account
      .update({
        data: account,
        where: {
          id: account.id,
        },
      })
      .then(AccountMapper.toDomain);
  }

  createTransaction(transaction: ITransaction) {
    return this.repository.transactions.create({
      data: transaction,
    });
  }

  saveTransfer(
    senderAccount: IAccount,
    receiverAccount: IAccount,
    value: number,
  ) {
    const transactions = [];
    transactions.push(async (prismaTransaction: PrismaClient) => {
      await prismaTransaction.account.update({
        data: senderAccount,
        where: {
          id: senderAccount.id,
        },
      });
      const senderTrancation = await prismaTransaction.transactions.create({
        data: {
          accountId: senderAccount.id,
          type: TransactionType.TRANSFER,
          value,
        },
      });
      await prismaTransaction.account.update({
        data: receiverAccount,
        where: {
          id: receiverAccount.id,
        },
      });
      return prismaTransaction.transactions.create({
        data: {
          accountId: receiverAccount.id,
          type: TransactionType.TRANSFER,
          value,
          senderTransactionId: senderTrancation.id,
        },
      });
    });
    return this.repository.$transaction(transactions);
  }
}
