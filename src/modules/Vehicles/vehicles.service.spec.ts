/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclesService } from './vehicles.service';
import { VehiclesEntity } from './entities/vehicles.entity';
import { CreateVehicleDto } from './dto/createVehicle.dto';
import { UpdateVehicleDto } from './dto/updateVehicle.dto';

function mockVehicle(partial: Partial<VehiclesEntity>): VehiclesEntity {
  return {
    id: partial.id ?? 'mock-id',
    plate: partial.plate ?? 'ABC1234',
    model: partial.model ?? 'Model X',
    color: partial.color ?? 'Black',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: null,
    updated_by: null,
    ...partial,
  } as VehiclesEntity;
}

describe('VehiclesService', () => {
  let service: VehiclesService;
  let repository: jest.Mocked<Repository<VehiclesEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        {
          provide: getRepositoryToken(VehiclesEntity),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
    repository = module.get(getRepositoryToken(VehiclesEntity));
  });

  describe('findAll', () => {
    it('should return a list of vehicles', async () => {
      const vehicles = [mockVehicle({ id: 'v1', plate: 'TEST1234' })];

      repository.find.mockResolvedValue(vehicles);

      const result = await service.findAll();

      expect(result.status).toBe('success');
      expect(repository.find).toHaveBeenCalled();
      expect(result.data).toBeDefined();
      expect(result.data?.length).toBe(1);
    });

    it('should return error on exception', async () => {
      repository.find.mockRejectedValue(new Error('DB error'));

      const result = await service.findAll();

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to retrieve vehicles');
    });
  });

  describe('create', () => {
    it('should create a vehicle successfully', async () => {
      const dto: CreateVehicleDto = {
        plate: 'XYZ9876',
        model: 'Corolla',
        color: 'Black',
      };

      const saved = mockVehicle({ id: '123', ...dto });

      repository.create.mockReturnValue(saved);
      repository.save.mockResolvedValue(saved);

      const result = await service.create(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(saved);
      expect(result.status).toBe('success');
      expect(result.data?.id).toBe('123');
    });

    it('should return error on exception', async () => {
      repository.create.mockImplementation(() => {
        throw new Error('Create fail');
      });

      const result = await service.create({
        plate: 'ERR1111',
        model: 'Y',
        color: 'Black',
      });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to create vehicle');
    });
  });

  describe('update', () => {
    it('should update a vehicle successfully', async () => {
      const existing = mockVehicle({ id: '1', plate: 'OLD1234' });

      const dto: UpdateVehicleDto = {
        plate: 'NEW0001',
        model: 'Focus',
      };

      const updated = mockVehicle({ id: '1', ...dto });

      repository.findOneBy.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      const result = await service.update('1', dto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repository.save).toHaveBeenCalled();
      expect(result.status).toBe('success');
      expect(result.data?.plate).toBe(dto.plate);
    });

    it('should return error when vehicle not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.update('1', {
        plate: 'XXX',
        model: 'Z',
      });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Vehicle not found');
    });

    it('should return error on exception', async () => {
      repository.findOneBy.mockRejectedValue(new Error('DB error'));

      const result = await service.update('1', {
        plate: 'XXX',
        model: 'Z',
      });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to update vehicle');
    });
  });
});
