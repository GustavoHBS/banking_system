import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';

export interface IDepositUseCase {
  execute(depositProps: IAccountAndValue): Promise<number>;
}
