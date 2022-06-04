import { Decimal } from '@prisma/client/runtime';
import { Cpf } from './cpf';
import { Email } from './email';
import { Entity } from './entity';
import { InvalidParams } from './invalidParams';
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
    if (email instanceof InvalidParams) {
      throw new InvalidParams('email');
    }
    if (cpf instanceof InvalidParams) {
      throw new InvalidParams('cpf');
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
      return new InvalidParams('balance');
    }
    this.props.balance = this.props.balance.add(value);
  }
}
