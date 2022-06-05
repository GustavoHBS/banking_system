import { transactions } from '@prisma/client';
import { Account } from 'src/shared/domain/account';
import { ITransaction } from 'src/shared/interface/transaction.interface';

export interface IAccountRepository {
  create(account: IAccount): Promise<Account>;

  findById(id: number): Promise<Account | null>;

  getAccountTransactions(id: number): Promise<transactions[]>;

  update(account: IAccount): Promise<Account>;

  createTransaction(transaction: ITransaction);

  saveTransfer(
    senderAccount: IAccount,
    receiverAccount: IAccount,
    value: number,
  );

  withdrawn(accountId: number, value: number): Promise<number>;
}
