import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AccountRepository } from 'src/repository/implementation/account.repository';
import { AccountMapper } from 'src/shared/mapper/account.mapper';
import { account } from '@prisma/client';
import { ITransfer } from 'src/shared/interface/transfer.interface';
import { Account } from 'src/shared/domain/account';
import { ServerException } from 'src/shared/exception/ServerException';
import { ITransferUseCase } from '../transferUseCase.interface';
import { IAccountRepository } from 'src/repository/accountRepository.interface';

@Injectable()
export class TransferUseCase implements ITransferUseCase {
  constructor(
    @Inject(AccountRepository)
    private accountRepository: IAccountRepository,
  ) {}

  async execute(transferProps: ITransfer): Promise<boolean> {
    const { value } = transferProps;
    const sender = await this.getAccount(transferProps.senderId);
    const receiver = await this.getAccount(transferProps.receiverId);
    sender.subBalance(value);
    receiver.addBalance(value);
    return this.accountRepository
      .saveTransfer(
        AccountMapper.toEntity(sender),
        AccountMapper.toEntity(receiver),
        value,
      )
      .then(() => true)
      .catch((err) => {
        throw new ServerException(
          'Occurred error in transfer, none transfer has been done! Try again',
          err,
        );
      });
  }

  private async getAccount(accountId: number) {
    const accountResult = await this.accountRepository.findById(accountId);
    if (!accountResult) {
      throw new HttpException('Account not found', HttpStatus.BAD_REQUEST);
    }
    return accountResult;
  }
}
