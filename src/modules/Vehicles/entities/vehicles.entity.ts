import { BaseEntity } from '@decorators/baseEntity.decorator';
import { vehicleYardTables } from 'src/enums/dataBase';
import { Column, Entity } from 'typeorm';

@Entity(vehicleYardTables.vehicles)
export class VehiclesEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 10 })
  plate: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'varchar', length: 10 })
  color: string;
}
