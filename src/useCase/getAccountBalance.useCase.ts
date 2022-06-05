import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';

@Injectable()
export class GetAccountBalanceUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(accountIdReq: string): Promise<number> {
    const accountId = parseInt(accountIdReq);
    const account = await this.getAccount(accountId);
    return account.balance.toNumber();
  }

  private async getAccount(accountId: number) {
    const accountFounded = await this.accountRepository.findById(accountId);
    if (!accountFounded) {
      throw new InvalidCoditionException('Account not found!');
    }
    return accountFounded;
  }
}
