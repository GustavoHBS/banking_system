import { IAccountAndValue } from 'src/shared/interface/accountAndValue.interface';

export interface IWithdrawnUseCase {
  execute(withdrawnProps: IAccountAndValue): Promise<number>;
}
