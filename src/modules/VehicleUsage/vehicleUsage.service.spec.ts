/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleUsageService } from './vehicleUsage.service';
import { VehicleUsageEntity } from './entities/vehicleUsage.entity';
import { StartUsageDto } from './dto/startUsage.dto';

function mockUsage(partial: Partial<VehicleUsageEntity>): VehicleUsageEntity {
  return {
    id: partial.id ?? 'mock-id',
    driver: partial.driver ?? { id: 'driver-id' },
    vehicle: partial.vehicle ?? { id: 'vehicle-id' },
    reason: partial.reason ?? 'Test reason',
    startDate: partial.startDate ?? new Date(),
    endDate: partial.endDate ?? null,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: null,
    updated_by: null,
    ...partial,
  } as VehicleUsageEntity;
}

describe('VehicleUsageService', () => {
  let service: VehicleUsageService;
  let repository: jest.Mocked<Repository<VehicleUsageEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleUsageService,
        {
          provide: getRepositoryToken(VehicleUsageEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VehicleUsageService>(VehicleUsageService);
    repository = module.get(getRepositoryToken(VehicleUsageEntity));
  });

  describe('findAll', () => {
    it('should return a list of vehicle usages', async () => {
      const usages = [mockUsage({ id: '1' })];

      repository.find.mockResolvedValue(usages);

      const result = await service.findAll();

      expect(result.status).toBe('success');
      expect(repository.find).toHaveBeenCalled();
      expect(result.data?.length).toBe(1);
    });

    it('should return error on exception', async () => {
      repository.find.mockRejectedValue(new Error('DB error'));

      const result = await service.findAll();

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to retrieve vehicle usages');
    });
  });

  describe('startUsage', () => {
    const dto: StartUsageDto = {
      vehicleId: 'vehicle-1',
      driverId: 'driver-1',
      reason: 'Test reason',
    };

    it('should start a vehicle usage successfully', async () => {
      repository.findOne.mockResolvedValue(null);

      const created = mockUsage({});
      const saved = mockUsage({ id: '123' });

      repository.create.mockReturnValue(created);
      repository.save.mockResolvedValue(saved);

      const result = await service.startUsage(dto);

      expect(repository.findOne).toHaveBeenCalledTimes(2);
      expect(repository.create).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
      expect(result.status).toBe('success');
      expect(result.data?.id).toBe('123');
    });

    it('should return error if vehicle is already in use', async () => {
      repository.findOne.mockResolvedValueOnce(mockUsage({}));

      const result = await service.startUsage(dto);

      expect(result.status).toBe('error');
      expect(result.message).toBe('Este veículo já está sendo utilizado.');
    });

    it('should return error if driver is already in use', async () => {
      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(mockUsage({}));

      const result = await service.startUsage(dto);

      expect(result.status).toBe('error');
      expect(result.message).toBe(
        'Este motorista já está utilizando um veículo.',
      );
    });

    it('should return generic error on exception', async () => {
      repository.findOne.mockRejectedValue(new Error('DB fail'));

      const result = await service.startUsage(dto);

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to end vehicle usage');
    });
  });

  describe('endUsage', () => {
    it('should end a vehicle usage successfully', async () => {
      const usage = mockUsage({ id: '1' });
      const saved = mockUsage({ id: '1', endDate: new Date() });

      repository.findOne.mockResolvedValue(usage);
      repository.save.mockResolvedValue(saved);

      const result = await service.endUsage('1');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.save).toHaveBeenCalled();
      expect(result.status).toBe('success');
      expect(result.data?.endDate).toBeDefined();
    });

    it('should return error when usage not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.endUsage('1');

      expect(result.status).toBe('error');
      expect(result.message).toBe('Usage not found');
    });

    it('should return generic error on exception', async () => {
      repository.findOne.mockRejectedValue(new Error('DB error'));

      const result = await service.endUsage('1');

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to end vehicle usage');
    });
  });
});
