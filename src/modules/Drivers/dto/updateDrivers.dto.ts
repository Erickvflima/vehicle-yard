import { PartialType } from '@nestjs/swagger';
import { CreateDriversDto } from './createDrivers.dto';

export class UpdateDriversDto extends PartialType(CreateDriversDto) {}
