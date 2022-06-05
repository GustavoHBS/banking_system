import { HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { TransactionType } from 'src/shared/enum/transactionType.enum';
import { InvalidCoditionException } from 'src/shared/exception/invalidCondition.exception';

@Injectable()
export class WithdrawnUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(depositProps: IAccountAndValue): Promise<boolean> {
    const { accountId, value } = depositProps;
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new InvalidCoditionException("Account don't exists");
    }
    const withdrawnIsSuccess = await this.accountRepository.withdrawn(
      accountId,
      value,
    );
    await this.accountRepository.createTransaction({
      accountId,
      type: TransactionType.WITHDRAWN,
      value,
    });
    return withdrawnIsSuccess;
  }
}
