import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { VehiclesEntity } from './entities/vehicles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclesEntity])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
