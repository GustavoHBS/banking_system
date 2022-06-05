import { TransactionType } from '../enum/transactionType.enum';

export interface IStatement {
  type: TransactionType;
  value: number;
  date: Date;
}
