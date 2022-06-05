import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { InvalidParam } from 'src/shared/domain/invalidParam';
import { IStatement } from 'src/shared/interface/statement.interface';
import { transactions } from '@prisma/client';

@Injectable()
export class GetStatementUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountId: number): Promise<IStatement[]> {
    const transactions = await this.accountRepository.getAccountTransactions(
      accountId,
    );
    if (!transactions) {
      throw new InvalidParam('accountId', 'Account not found for this ID!');
    }
    return transactions.map(this.formatStatement);
  }

  formatStatement(transaction: transactions): IStatement {
    let value = transaction.value;
    switch (transaction.type) {
      case 'TRANSFER':
        if (!transaction.senderTransactionId) {
          value = value.neg();
        }
        break;
      case 'WITHDRAWN':
        value = value.neg();
        break;
    }
    return {
      type: TransactionType[transaction.type],
      date: transaction.date,
      value: value.toNumber(),
    };
  }
}
