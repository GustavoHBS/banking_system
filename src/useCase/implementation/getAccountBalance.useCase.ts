import { Inject, Injectable } from '@nestjs/common';
import { IAccountRepository } from 'src/repository/accountRepository.interface';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';
import { IGetAccountBalanceUseCase } from '../getAccountBalanceUseCase.interface';

@Injectable()
export class GetAccountBalanceUseCase implements IGetAccountBalanceUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(accountIdReq: string): Promise<number> {
    if (!accountIdReq) {
      throw new InvalidCoditionException('AccountId was not informed');
    }
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
