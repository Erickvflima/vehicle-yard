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
import { DriversService } from './drivers.service';
import { CreateDriversDto } from './dto/createDrivers.dto';
import { UpdateDriversDto } from './dto/updateDrivers.dto';
import { DriversListDto } from './dto/driversList.dto';
import { IBaseResponse } from '@interfaces/baseResponse';
import { DriversEntity } from './entities/drivers.entity';
import { FindManyOptions } from 'typeorm';

@Controller('drivers')
@ApiTags('Drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of drivers retrieved successfully',
    type: DriversListDto,
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
    name: 'name',
    type: String,
    required: false,
    description: 'Filter drivers by name',
  })
  async findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('name') name?: string,
  ): Promise<IBaseResponse<DriversListDto[]>> {
    const options: FindManyOptions<DriversEntity> = {};

    if (skip) options.skip = Number(skip);
    if (take) options.take = Number(take);

    if (name) {
      options.where = { name };
    }

    return this.driversService.findAll(options);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Driver created successfully',
    type: DriversEntity,
  })
  async create(
    @Body() dto: CreateDriversDto,
  ): Promise<IBaseResponse<DriversEntity>> {
    return this.driversService.create(dto);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Driver updated successfully',
    type: DriversEntity,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDriversDto,
  ): Promise<IBaseResponse<DriversEntity>> {
    return this.driversService.update(id, dto);
  }
}
