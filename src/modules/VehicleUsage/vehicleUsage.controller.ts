import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { StartUsageDto } from './dto/startUsage.dto';
import { VehicleUsageService } from './vehicleUsage.service';

@ApiTags('VehicleUsage')
@Controller('vehicleUsage')
export class VehicleUsageController {
  constructor(private readonly usageService: VehicleUsageService) {}

  @Get()
  @ApiOperation({ summary: 'List all vehicle usage records' })
  @ApiResponse({
    status: 200,
    description: 'List retrieved successfully',
  })
  async findAll() {
    return this.usageService.findAll({
      order: { startDate: 'DESC' },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Start a new vehicle usage' })
  @ApiBody({
    description: 'Driver, vehicle and reason for usage',
    type: StartUsageDto,
    examples: {
      default: {
        summary: 'Standard example',
        value: {
          driverId: '9f0122d1-b81e-43d7-8e3b-5f8580f8a9f2',
          vehicleId: 'df922fe3-6e5d-4d3e-8475-167ab21e41c3',
          reason: 'Entrega de documentos no centro',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Vehicle usage started successfully',
  })
  async start(@Body() body: StartUsageDto) {
    return this.usageService.startUsage(body);
  }

  @Patch('end/:id')
  @ApiOperation({ summary: 'End a running vehicle usage' })
  @ApiParam({
    name: 'id',
    description: 'ID of the vehicle usage record',
    example: 'b3c87cb3-88e6-4fd7-9d20-38e704ab1d0c',
  })
  @ApiResponse({
    status: 200,
    description: 'Vehicle usage ended successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Usage not found',
  })
  async end(@Param('id') id: string) {
    return this.usageService.endUsage(id);
  }
}
