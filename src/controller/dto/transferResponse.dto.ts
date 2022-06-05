import { ApiProperty } from '@nestjs/swagger';

export class transferResponseDTO {
  @ApiProperty({
    type: String,
  })
  message: string;
}
