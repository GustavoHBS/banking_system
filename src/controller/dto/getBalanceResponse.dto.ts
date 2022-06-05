import { ApiProperty } from '@nestjs/swagger';

export class GetBalanceResponseDTO {
  @ApiProperty({
    type: Number,
  })
  balance: number;
}
