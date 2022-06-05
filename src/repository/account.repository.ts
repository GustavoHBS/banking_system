import { Injectable } from '@nestjs/common';
import {
  prisma,
  PrismaClient,
  PrismaPromise,
  transactions,
} from '@prisma/client';
import { Account } from 'src/shared/domain/account';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';
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

  getAccountTransactions(id: number): Promise<transactions[]> {
    return this.repository.account
      .findUnique({
        where: {
          id,
        },
        include: {
          transactions: true,
        },
      })
      .then((account) => account?.transactions);
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
    return this.repository.$transaction(
      async (prismaTransaction: PrismaClient) => {
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
      },
    );
  }

  async withdrawn(accountId: number, value: number): Promise<boolean> {
    return this.repository.$transaction(async (prismaTransaction) => {
      const accountUpdated = await prismaTransaction.account.update({
        data: {
          balance: {
            decrement: value,
          },
        },
        where: {
          id: accountId,
        },
      });
      if (accountUpdated.balance.lessThan(0)) {
        throw new InvalidCoditionException(
          'The value required is greater than balance!!!',
        );
      }
      return true;
    });
  }
}
