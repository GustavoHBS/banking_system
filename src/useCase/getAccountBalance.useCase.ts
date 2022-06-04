import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';

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
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    }
    return accountFounded;
  }
}
