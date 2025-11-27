import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { DriversEntity } from './entities/drivers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DriversEntity])],
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
