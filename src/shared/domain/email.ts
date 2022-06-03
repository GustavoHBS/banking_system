import { InvalidParams } from './invalidParams';

export class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Email | InvalidParams {
    if (!email.includes('@')) {
      return new InvalidParams('email');
    }
    return new Email(email);
  }

  getValue(): string {
    return this.email;
  }
}
