import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Account } from 'src/shared/domain/account';
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
}
