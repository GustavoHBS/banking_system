import { Injectable } from '@nestjs/common';
import { Account } from 'src/shared/domain/account';
import { AccountRepository } from 'src/repository/account.repository';
import { IUserData } from 'src/shared/interface/userData.interface';
import { ServerException } from 'src/shared/exception/ServerException';
import { AccountMapper } from 'src/shared/mapper/account.mapper';

@Injectable()
export class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(userData: IUserData): Promise<IAccount> {
    const account = Account.create(userData);
    return this.accountRepository
      .create(AccountMapper.toEntity(account))
      .then(AccountMapper.toDTO)
      .catch((err) => {
        throw new ServerException(
          'There was an error creating an account',
          err,
        );
      });
  }
}
