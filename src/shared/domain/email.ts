import { InvalidCoditionException } from '../exception/invalidCondition.exception';

export class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Email {
    if (!email.includes('@')) {
      throw new InvalidCoditionException('Email invalid!');
    }
    return new Email(email);
  }

  getValue(): string {
    return this.email;
  }
}
