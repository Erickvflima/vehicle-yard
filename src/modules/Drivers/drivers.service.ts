import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { IBaseResponse } from '@interfaces/baseResponse';
import { DriversEntity } from './entities/drivers.entity';
import { DriversFactory } from './drivers.factory';
import { DriversListDto } from './dto/driversList.dto';
import { CreateDriversDto } from './dto/createDrivers.dto';
import { UpdateDriversDto } from './dto/updateDrivers.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriversEntity)
    private readonly driversRepository: Repository<DriversEntity>,
  ) {}

  async findAll(
    options: FindManyOptions<DriversEntity> = {},
  ): Promise<IBaseResponse<DriversListDto[]>> {
    try {
      const drivers = await this.driversRepository.find(options);

      return {
        status: 'success',
        message: 'Drivers retrieved successfully',
        data: DriversFactory.toListItems(drivers),
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message: 'Failed to retrieve drivers',
      };
    }
  }

  async create(data: CreateDriversDto): Promise<IBaseResponse<DriversEntity>> {
    try {
      const vehicle = this.driversRepository.create(data);
      const saved = await this.driversRepository.save(vehicle);

      return {
        status: 'success',
        message: 'Driver created successfully',
        data: saved,
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message: 'Failed to create vehicle',
      };
    }
  }

  async update(
    id: string,
    data: UpdateDriversDto,
  ): Promise<IBaseResponse<DriversEntity>> {
    try {
      const vehicle = await this.driversRepository.findOneBy({ id });

      if (!vehicle) throw new NotFoundException('Driver not found');

      Object.assign(vehicle, data);
      const updated = await this.driversRepository.save(vehicle);

      return {
        status: 'success',
        message: 'Driver updated successfully',
        data: updated,
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message:
          error instanceof NotFoundException
            ? error.message
            : 'Failed to update vehicle',
      };
    }
  }
}
