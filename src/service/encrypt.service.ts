import { AES as encrypter } from 'crypto-js/';

export class EncryptService {
  private static privateKey = process.env.PRIVATE_KEY;

  static encrypt(value: string): string {
    return encrypter.encrypt(value, this.privateKey).toString();
  }
}
