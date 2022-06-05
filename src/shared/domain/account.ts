import { Decimal } from '@prisma/client/runtime';
import { Cpf } from './cpf';
import { Email } from './email';
import { Entity } from './entity';
import { InvalidParam } from './invalidParam';
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
    //const account = structuredClone(props);
    if (account.id) {
      return new Account(account);
    }
    const email = Email.create(account.email);
    const cpf = Cpf.create(account.cpf);
    const password = Password.create(account.password);
    if (email instanceof InvalidParam) {
      throw new InvalidParam('email');
    }
    if (cpf instanceof InvalidParam) {
      throw new InvalidParam('cpf');
    }
    account.email = email.getValue();
    account.cpf = cpf.getValue();
    account.password = password.getValue();
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
      return new InvalidParam('balance');
    }
    this.props.balance = this.props.balance.add(value);
  }

  subBalance(value: number) {
    if (value <= 0) {
      throw new InvalidParam('balance');
    }
    if (this.balance.lessThan(value)) {
      throw new InvalidParam(
        'balance',
        'The Balance of account is not enough!',
      );
    }
    this.props.balance = this.props.balance.sub(value);
    return true;
  }
}
