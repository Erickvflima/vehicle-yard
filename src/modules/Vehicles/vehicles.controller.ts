import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';
import { VehiclesListDto } from './dto/vehiclesList.dto';
import { IBaseResponse } from '@interfaces/baseResponse';
import { VehiclesEntity } from './entities/vehicles.entity';
import { FindManyOptions } from 'typeorm';

@Controller('vehicles')
@ApiTags('Vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of vehicles retrieved successfully',
    type: VehiclesListDto,
    isArray: true,
  })
  @ApiQuery({
    name: 'skip',
    type: Number,
    required: false,
    description: 'Number of items to skip for pagination',
  })
  @ApiQuery({
    name: 'take',
    type: Number,
    required: false,
    description: 'Number of items to take for pagination',
  })
  @ApiQuery({
    name: 'plate',
    type: String,
    required: false,
    description: 'Filter vehicles by plate',
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('plate') plate?: string,
  ): Promise<IBaseResponse<VehiclesListDto[]>> {
    const options: FindManyOptions<VehiclesEntity> = {};

    if (skip) options.skip = Number(skip);
    if (take) options.take = Number(take);

    if (plate) {
      options.where = { plate };
    }

    return this.vehiclesService.findAll(options);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Vehicle created successfully',
    type: VehiclesEntity,
  })
  async create(
    @Body() dto: CreateVehicleDto,
  ): Promise<IBaseResponse<VehiclesEntity>> {
    return this.vehiclesService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Vehicle updated successfully',
    type: VehiclesEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
  ): Promise<IBaseResponse<VehiclesEntity>> {
    return this.vehiclesService.update(id, dto);
  }
}
