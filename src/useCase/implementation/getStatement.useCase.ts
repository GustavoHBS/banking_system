import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { IStatement } from 'src/shared/interface/statement.interface';
import { transactions } from '@prisma/client';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';
import { IGetStatementUseCase } from '../getStatementUseCase.interface';
import { IAccountRepository } from 'src/repository/accountRepository.interface';

@Injectable()
export class GetStatementUseCase implements IGetStatementUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(accountId: number): Promise<IStatement[]> {
    const transactions = await this.accountRepository.getAccountTransactions(
      accountId,
    );
    if (!transactions) {
      throw new InvalidCoditionException('Account not found for this ID!');
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
