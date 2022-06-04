import { InvalidParam } from './invalidParams';

export class Cpf {
  private cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static create(cpf: string): Cpf | InvalidParam {
    const CPF_LENGTH = 11;
    const cpfNumbers = cpf.replace(/[^\d]/g, '');
    if (cpfNumbers.length != CPF_LENGTH) {
      return new InvalidParam('cpf');
    }
    return new Cpf(cpf);
  }

  getValue(): string {
    return this.cpf;
  }
}
