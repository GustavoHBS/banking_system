export interface IGetAccountBalanceUseCase {
  execute(accountId: string): Promise<number>;
}
