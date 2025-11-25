import { ApiProperty } from '@nestjs/swagger';

export class VehiclesListDto {
  @ApiProperty({ description: 'Placa do veículo' })
  plate: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  model: string;

  @ApiProperty({ description: 'Cor do veículo como número' })
  color: number;
}
