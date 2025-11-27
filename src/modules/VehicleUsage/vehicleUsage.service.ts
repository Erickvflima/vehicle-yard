import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, IsNull } from 'typeorm';
import { IBaseResponse } from '@interfaces/baseResponse';
import { VehicleUsageEntity } from './entities/vehicleUsage.entity';
import { VehicleUsageFactory } from './vehicleUsage.factory';
import { StartUsageDto } from './dto/startUsage.dto';

@Injectable()
export class VehicleUsageService {
  constructor(
    @InjectRepository(VehicleUsageEntity)
    private readonly usageRepository: Repository<VehicleUsageEntity>,
  ) {}

  async findAll(
    options: FindManyOptions<VehicleUsageEntity> = {},
  ): Promise<IBaseResponse<any[]>> {
    try {
      const usages = await this.usageRepository.find(options);

      return {
        status: 'success',
        message: 'Vehicle usages retrieved successfully',
        data: VehicleUsageFactory.toListItems(usages),
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message: 'Failed to retrieve vehicle usages',
      };
    }
  }
  private async validateVehicleIsAvailable(vehicleId: string): Promise<void> {
    const inUse = await this.usageRepository.findOne({
      where: {
        vehicle: { id: vehicleId },
        endDate: IsNull(),
      },
    });

    if (inUse) {
      throw new BadRequestException('Este veículo já está sendo utilizado.');
    }
  }

  private async validateDriverIsAvailable(driverId: string): Promise<void> {
    const inUse = await this.usageRepository.findOne({
      where: {
        driver: { id: driverId },
        endDate: IsNull(),
      },
    });

    if (inUse) {
      throw new BadRequestException(
        'Este motorista já está utilizando um veículo.',
      );
    }
  }

  async startUsage(
    data: StartUsageDto,
  ): Promise<IBaseResponse<VehicleUsageEntity>> {
    try {
      await this.validateVehicleIsAvailable(data.vehicleId);
      await this.validateDriverIsAvailable(data.driverId);

      const usage = this.usageRepository.create({
        driver: { id: data.driverId },
        vehicle: { id: data.vehicleId },
        reason: data.reason,
        startDate: new Date(),
      });

      const saved = await this.usageRepository.save(usage);

      return {
        status: 'success',
        message: 'Vehicle usage started successfully',
        data: saved,
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message:
          error instanceof HttpException
            ? error.message
            : 'Failed to end vehicle usage',
      };
    }
  }

  async endUsage(id: string): Promise<IBaseResponse<VehicleUsageEntity>> {
    try {
      const usage = await this.usageRepository.findOne({ where: { id } });

      if (!usage) throw new NotFoundException('Usage not found');

      usage.endDate = new Date();

      const updated = await this.usageRepository.save(usage);

      return {
        status: 'success',
        message: 'Vehicle usage ended successfully',
        data: updated,
      };
    } catch (error) {
      Logger.error(error);
      return {
        status: 'error',
        message:
          error instanceof NotFoundException
            ? error.message
            : 'Failed to end vehicle usage',
      };
    }
  }
}
