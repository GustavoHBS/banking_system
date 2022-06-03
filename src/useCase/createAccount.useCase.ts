import { Injectable } from '@nestjs/common';
import { Account } from 'src/shared/domain/account';
import { AccountRepository } from 'src/repository/account.repository';
import { IUserData } from 'src/shared/interface/userData.interface';
import { ServerError } from 'src/shared/domain/serverError';

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(userData: IUserData): Promise<boolean | ServerError> {
    const account = Account.create(userData);
    return this.accountRepository
      .create(account)
      .then(() => true)
      .catch((err) => {
        return new ServerError('There was an error creating an account', err);
      });
  }
}
