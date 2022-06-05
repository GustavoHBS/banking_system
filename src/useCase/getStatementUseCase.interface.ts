import { IStatement } from 'src/shared/interface/statement.interface';

export interface IGetStatementUseCase {
  execute(accountId: number): Promise<IStatement[]>;
}
