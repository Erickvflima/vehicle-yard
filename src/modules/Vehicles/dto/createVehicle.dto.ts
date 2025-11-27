import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Placa do veículo', maxLength: 10 })
  @IsString()
  @Length(1, 10)
  plate: string;

  @ApiProperty({ description: 'Modelo do veículo' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Cor do veículo' })
  @IsString()
  color: string;
}
