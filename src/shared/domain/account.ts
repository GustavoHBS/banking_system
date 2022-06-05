import { Decimal } from '@prisma/client/runtime';
import { Cpf } from './cpf';
import { Email } from './email';
import { Entity } from './entity';
import { InvalidCoditionException } from '../exception/invalidCondition.exception';
import { Password } from './password';

interface IAccountProps {
  id?: number;
  email: string;
  name: string;
  password: string;
  cpf: string;
  balance?: Decimal;
}

export class Account extends Entity<IAccountProps> {
  private constructor(props: IAccountProps) {
    super(props);
  }

  static create(account: IAccountProps): Account {
    if (account.id) {
      return new Account(account);
    }
    account.email = Email.create(account.email).getValue();
    account.cpf = Cpf.create(account.cpf).getValue();
    account.password = Password.create(account.password).getValue();
    return new Account(account);
  }

  public get id(): number {
    return this.props.id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get name(): string {
    return this.props.name;
  }

  public get password(): string {
    return this.props.password;
  }

  public get cpf(): string {
    return this.props.cpf;
  }

  public get balance(): Decimal {
    return this.props.balance;
  }

  addBalance(value: number) {
    if (value <= 0) {
      throw new InvalidCoditionException('Value should be greater then 0');
    }
    this.props.balance = this.props.balance.add(value);
  }

  subBalance(value: number) {
    if (value <= 0) {
      throw new InvalidCoditionException('Value should be greater then 0');
    }
    if (this.balance.lessThan(value)) {
      throw new InvalidCoditionException('The value is greater than balance!');
    }
    this.props.balance = this.props.balance.sub(value);
    return true;
  }
}
