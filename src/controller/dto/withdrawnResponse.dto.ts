import { ApiProperty } from '@nestjs/swagger';

export class WithdrawnResponseDTO {
  @ApiProperty({
    type: String,
  })
  message: string;

  @ApiProperty({
    type: Number,
  })
  newBalance: number;
}
