import { InvalidParam } from './invalidParams';

export class Email {
  private email: string;

  private constructor(email: string) {
    this.email = email;
  }

  static create(email: string): Email | InvalidParam {
    if (!email.includes('@')) {
      return new InvalidParam('email');
    }
    return new Email(email);
  }

  getValue(): string {
    return this.email;
  }
}
