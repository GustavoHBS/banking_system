import { Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';
import { IWithdrawnUseCase } from '../withdrawnUseCase.interface';
import { IAccountRepository } from 'src/repository/accountRepository.interface';

@Injectable()
export class WithdrawnUseCase implements IWithdrawnUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(withdrawnProps: IAccountAndValue): Promise<number> {
    const { accountId, value } = withdrawnProps;
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new InvalidCoditionException("Account don't exists");
    }
    const newBalance = await this.accountRepository.withdrawn(accountId, value);
    await this.accountRepository.createTransaction({
      accountId,
      type: TransactionType.WITHDRAWN,
      value,
    });
    return newBalance;
  }
}
