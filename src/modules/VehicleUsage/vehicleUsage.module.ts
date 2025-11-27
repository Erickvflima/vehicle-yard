import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleUsageEntity } from './entities/vehicleUsage.entity';
import { VehicleUsageController } from './vehicleUsage.controller';
import { VehicleUsageService } from './vehicleUsage.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleUsageEntity])],
  controllers: [VehicleUsageController],
  providers: [VehicleUsageService],
})
export class VehicleUsageModule {}
