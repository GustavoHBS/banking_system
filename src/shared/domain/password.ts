import { EncryptService } from 'src/service/encrypt.service';
import { InvalidParam } from './invalidParams';

export class Password {
  private password: string;

  private constructor(password: string) {
    this.password = password;
  }

  static create(password: string): Password {
    return new Password(EncryptService.encrypt(password));
  }

  getValue(): string {
    return this.password;
  }
}
