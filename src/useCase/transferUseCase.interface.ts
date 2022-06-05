import { ITransfer } from 'src/shared/interface/transfer.interface';

export interface ITransferUseCase {
  execute(transferProps: ITransfer): Promise<boolean>;
}
