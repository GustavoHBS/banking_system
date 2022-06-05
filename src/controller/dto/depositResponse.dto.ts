import { ApiProperty } from '@nestjs/swagger';

export class DepositResponseDTO {
  @ApiProperty({
    type: String,
  })
  message: string;

  @ApiProperty({
    type: Number,
  })
  newBalance: number;
}
