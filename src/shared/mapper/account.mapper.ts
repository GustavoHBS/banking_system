import { account } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Account } from '../domain/account';

export class AccountMapper {
  static toDomain(account: IAccount | account): Account {
    return Account.create({
      ...account,
      balance: new Decimal(account.balance),
    });
  }

  static toEntity(account: Account): IAccount {
    return {
      id: account.id,
      name: account.name,
      email: account.email,
      password: account.password,
      cpf: account.cpf,
      balance: account.balance.toNumber(),
    };
  }
}
