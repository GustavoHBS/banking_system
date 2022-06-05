import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/account.repository';
import { ServerError } from 'src/shared/domain/serverError';
import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account } from '@prisma/client';
import { TransactionType } from 'src/shared/enum/transactionType.enum';

@Injectable()
export class WithdrawnUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(depositProps: IAccountAndValue): Promise<boolean> {
    const { accountId, value } = depositProps;
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
