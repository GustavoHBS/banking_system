import { InvalidCoditionException } from '../exception/invalidCondition.exception';

export class Cpf {
  private cpf: string;

  private constructor(cpf: string) {
    this.cpf = cpf;
  }

  static create(cpf: string): Cpf {
    const CPF_LENGTH = 11;
    const cpfNumbers = cpf.replace(/[^\d]/g, '');
    if (cpfNumbers.length != CPF_LENGTH) {
      throw new InvalidCoditionException('CPF invalid!');
    }
    return new Cpf(cpf);
  }

  getValue(): string {
    return this.cpf;
  }
}
