import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Account } from 'src/shared/domain/account';

@Injectable()
export class AccountRepository {
  private repository: PrismaClient;
  constructor() {
    this.repository = new PrismaClient();
  }
  async create(account: Account) {
    return this.repository.account.create({
      data: account,
    });
  }
}
