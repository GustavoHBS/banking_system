import { TransactionType } from '../enum/transactionType.enum';

export interface ITransaction {
  id?: number;
  accountId: number;
  type: TransactionType;
  value: number;
  date?: Date;
  senderTransactionId?: number;
}
