import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { IBaseResponse } from '@interfaces/baseResponse';
import { VehiclesEntity } from './entities/vehicles.entity';
import { VehiclesFactory } from './vehicles.factory';
import { VehiclesListDto } from './dto/vehiclesList.dto';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehiclesEntity)
    private readonly vehiclesRepository: Repository<VehiclesEntity>,
  ) {}

  async findAll(
    options: FindManyOptions<VehiclesEntity> = {},
  ): Promise<IBaseResponse<VehiclesListDto[]>> {
    try {
      const vehicles = await this.vehiclesRepository.find(options);

      return {
        status: 'success',
        message: 'Vehicles retrieved successfully',
        data: VehiclesFactory.toListItems(vehicles),
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message: 'Failed to retrieve vehicles',
      };
    }
  }

  async create(data: CreateVehicleDto): Promise<IBaseResponse<VehiclesEntity>> {
    try {
      const vehicle = this.vehiclesRepository.create(data);
      const saved = await this.vehiclesRepository.save(vehicle);

      return {
        status: 'success',
        message: 'Vehicle created successfully',
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
    data: UpdateVehicleDto,
  ): Promise<IBaseResponse<VehiclesEntity>> {
    try {
      const vehicle = await this.vehiclesRepository.findOneBy({ id });

      if (!vehicle) throw new NotFoundException('Vehicle not found');

      Object.assign(vehicle, data);
      const updated = await this.vehiclesRepository.save(vehicle);

      return {
        status: 'success',
        message: 'Vehicle updated successfully',
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
