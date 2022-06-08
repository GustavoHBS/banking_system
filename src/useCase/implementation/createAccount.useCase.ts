import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'src/shared/domain/account';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { IUserData } from 'src/shared/interface/userData.interface';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { ICreateAccountUseCase } from '../createAccountUseCase.interface';
import { IAccountRepository } from 'src/repository/accountRepository.interface';

@Injectable()
export class CreateAccountUseCase implements ICreateAccountUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(userData: IUserData): Promise<IAccountDTO> {
    const account = Account.create(userData);
    return this.accountRepository
      .create(AccountMapper.toEntity(account))
      .then(AccountMapper.toDTO);
  }
}
