import { Injectable } from '@nestjs/common';
import { Account } from 'src/shared/domain/account';
import { AccountRepository } from 'src/repository/account.repository';
import { IUserData } from 'src/shared/interface/userData.interface';
import { ServerError } from 'src/shared/domain/serverError';
import { InvalidParams } from 'src/shared/domain/invalidParams';
import { CustomHttpError } from 'src/shared/domain/error';

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(userData: IUserData): Promise<boolean | CustomHttpError> {
    const account = Account.create(userData);
    if (account instanceof InvalidParams) {
      return account;
    }
    return this.accountRepository
      .create(account)
      .then(() => true)
      .catch((err) => {
        console.log(err);
        return new ServerError('There was an error creating an account', err);
      });
  }
}
