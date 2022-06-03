import { Cpf } from './cpf';
import { Email } from './email';
import { InvalidParams } from './invalidParams';
import { Password } from './password';

interface AccountProps {
  id?: number;
  email: string;
  name: string;
  password: string;
  cpf: string;
  balance?: number;
}

export class Account {
  public readonly id: number;
  public readonly email: string;
  public readonly name: string;
  public readonly password: string;
  public readonly cpf: string;
  public readonly balance: number;

  private constructor(props: AccountProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.password = props.password;
    this.cpf = props.cpf;
    this.balance = props.balance;
  }

  static create(props: AccountProps): Account {
    const account = structuredClone(props);
    const email = Email.create(props.email);
    const cpf = Cpf.create(props.cpf);
    const password = Password.create(props.password);
    if (email instanceof InvalidParams) {
      throw new Error('Email invalido!');
    }
    if (cpf instanceof InvalidParams) {
      throw new Error('Cpf invalido!');
    }
    account.email = email.getValue();
    account.cpf = email.getValue();
    account.password = password.getValue();
    return new Account(account);
  }
}
