import { BaseEntity } from '@decorators/baseEntity.decorator';
import { vehicleYardTables } from 'src/enums/dataBase';
import { Column, Entity } from 'typeorm';

@Entity(vehicleYardTables.drivers)
export class DriversEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;
}
