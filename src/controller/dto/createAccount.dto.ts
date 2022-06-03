import { ApiProperty } from '@nestjs/swagger';
import { IUserData } from 'src/shared/interface/userData.interface';

export class CreateAccountDTO implements IUserData {
  @ApiProperty({
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  cpf: string;
}
