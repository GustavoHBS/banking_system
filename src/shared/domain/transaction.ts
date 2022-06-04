import { Decimal } from '@prisma/client/runtime';
import { TransactionType } from '../enum/transactionType.enum';
import { Entity } from './entity';

interface ITransactionProps {
  id: number;
  accountId: number;
  type: TransactionType;
  value: Decimal;
  date: Date;
  senderId?: number;
}

export class Transaction extends Entity<ITransactionProps> {
  private constructor(props: ITransactionProps) {
    super(props);
  }

  static create(transaction: ITransactionProps): Transaction {
    return new Transaction(transaction);
  }

  public get id(): number {
    return this.props.id;
  }

  public get accountId(): number {
    return this.props.accountId;
  }

  public get type(): TransactionType {
    return this.props.type;
  }

  public get value(): Decimal {
    return this.props.value;
  }

  public get date(): Date {
    return this.props.date;
  }

  public get senderId(): number {
    return this.props.senderId;
  }
}
