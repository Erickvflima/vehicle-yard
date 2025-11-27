import { ApiProperty } from '@nestjs/swagger';

export class VehiclesListDto {
  @ApiProperty({ description: 'ID do veículo.' })
  id: string;

  @ApiProperty({ description: 'Placa do veículo' })
  plate: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  model: string;

  @ApiProperty({ description: 'Cor do veículo ' })
  color: string;
}
