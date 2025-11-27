import { ApiProperty } from '@nestjs/swagger';

export class DriversListDto {
  @ApiProperty({ description: 'ID do motorista.' })
  id: string;

  @ApiProperty({ description: 'Nome do motorista.' })
  name: string;
}
