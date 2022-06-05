import { IUserData } from 'src/shared/interface/userData.interface';

export interface ICreateAccountUseCase {
  execute(userData: IUserData): Promise<IAccount>;
}
