import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class StartUsageDto {
  @ApiProperty({
    description: 'ID do motorista que está utilizando o veículo',
    example: '9f0122d1-b81e-43d7-8e3b-5f8580f8a9f2',
  })
  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty({
    description: 'ID do veículo que será utilizado',
    example: 'df922fe3-6e5d-4d3e-8475-167ab21e41c3',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
    description: 'Motivo da utilização do veículo',
    example: 'Entrega de documentos no centro',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
