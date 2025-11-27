import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDriversDto {
  @ApiProperty({ description: 'Nome do motorista', maxLength: 10 })
  @IsString()
  @Length(1, 200)
  name: string;
}
