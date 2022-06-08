import { Injectable } from '@nestjs/common';
import { PrismaClient, transactions } from '@prisma/client';
import { Account } from 'src/shared/domain/account';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { ITransaction } from 'src/shared/interface/transaction.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { Decimal } from '@prisma/client/runtime';
import { IAccountRepository } from '../accountRepository.interface';
import { ServerException } from 'src/shared/exception/ServerException';

@Injectable()
export class AccountRepository implements IAccountRepository {
  private repository: PrismaClient;
  constructor() {
    this.repository = new PrismaClient();
  }
  async create(account: IAccount): Promise<Account | never> {
    return this.repository.account
      .create({
        data: account,
      })
      .then(AccountMapper.toDomain)
      .catch((err) => {
        if (err.meta?.target?.length) {
          const errorField = err.meta?.target[0];
          throw new InvalidCoditionException(
            `The ${errorField} must be unique, exist another account with this ${errorField}`,
          );
        }
        throw new ServerException(
          'There was an error creating an account',
          err,
        );
      });
  }

  findById(id: number): Promise<Account | null> {
    return this.repository.account
      .findUnique({
        where: {
          id,
        },
      })
      .then((account) => (account ? AccountMapper.toDomain(account) : null));
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
        const updatedSender = await prismaTransaction.account.update({
          data: senderAccount,
          where: {
            id: senderAccount.id,
          },
        });
        this.validateBalance(updatedSender.balance);
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

  async withdrawn(accountId: number, value: number): Promise<number> {
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
      const balance = accountUpdated.balance;
      this.validateBalance(balance);
      return balance.toNumber();
    });
  }

  private validateBalance(balance: Decimal): void | never {
    if (balance.lessThan(0)) {
      throw new InvalidCoditionException(
        'The value required is greater than balance!!!',
      );
    }
  }
}
