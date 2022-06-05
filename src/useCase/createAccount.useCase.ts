import { Injectable } from '@nestjs/common';
import { Account } from 'src/shared/domain/account';
import { AccountRepository } from 'src/repository/account.repository';
import { IUserData } from 'src/shared/interface/userData.interface';
import { ServerError } from 'src/shared/domain/serverError';
import { InvalidParam } from 'src/shared/domain/invalidParam';
import { CustomHttpError } from 'src/shared/domain/error';
import { AccountMapper } from 'src/shared/mapper/account.mapper';

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(userData: IUserData): Promise<number | CustomHttpError> {
    const account = Account.create(userData);
    if (account instanceof InvalidParam) {
      return account;
    }
    return this.accountRepository
      .create(AccountMapper.toEntity(account))
      .then((account) => account.id)
      .catch((err) => {
        console.log(err);
        return new ServerError('There was an error creating an account', err);
      });
  }
}
