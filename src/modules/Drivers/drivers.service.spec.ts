/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriversService } from './drivers.service';
import { DriversEntity } from './entities/drivers.entity';
import { CreateDriversDto } from './dto/createDrivers.dto';
import { UpdateDriversDto } from './dto/updateDrivers.dto';

function mockDriver(partial: Partial<DriversEntity>): DriversEntity {
  return {
    id: partial.id ?? 'mock-id',
    name: partial.name ?? 'Mock Name',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: null,
    updated_by: null,
    ...partial,
  } as DriversEntity;
}

describe('DriversService', () => {
  let service: DriversService;
  let repository: jest.Mocked<Repository<DriversEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: getRepositoryToken(DriversEntity),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
    repository = module.get(getRepositoryToken(DriversEntity));
  });

  describe('findAll', () => {
    it('should return a list of drivers', async () => {
      const drivers = [mockDriver({ id: '1', name: 'John Doe' })];

      repository.find.mockResolvedValue(drivers);

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
      expect(result.message).toBe('Failed to retrieve drivers');
    });
  });

  describe('create', () => {
    it('should create a driver successfully', async () => {
      const dto: CreateDriversDto = { name: 'New Driver' };
      const saved = mockDriver({ id: '123', name: dto.name });

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

      const result = await service.create({ name: 'Erro' });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to create vehicle');
    });
  });

  describe('update', () => {
    it('should update a driver successfully', async () => {
      const existing = mockDriver({ id: '1', name: 'Old Name' });
      const dto: UpdateDriversDto = { name: 'Updated Name' };
      const updated = mockDriver({ id: '1', name: dto.name });

      repository.findOneBy.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      const result = await service.update('1', dto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(repository.save).toHaveBeenCalled();
      expect(result.status).toBe('success');
      expect(result?.data?.name).toBe('Updated Name');
    });

    it('should return error if driver not found', async () => {
      repository.findOneBy.mockResolvedValue(null);

      const result = await service.update('1', { name: 'X' });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Driver not found');
    });

    it('should return error on exception', async () => {
      repository.findOneBy.mockRejectedValue(new Error('DB error'));

      const result = await service.update('1', { name: 'X' });

      expect(result.status).toBe('error');
      expect(result.message).toBe('Failed to update vehicle');
    });
  });
});
