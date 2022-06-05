import { ApiProperty } from '@nestjs/swagger';
class AccountResponseDTO implements IAccountDTO {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  cpf: string;

  @ApiProperty({
    type: Number,
  })
  balance: number;
}

export class CreateAccountResponseDTO {
  @ApiProperty({
    type: String,
  })
  message: string;

  @ApiProperty({
    type: AccountResponseDTO,
  })
  account: IAccountDTO;
}
