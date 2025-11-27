import { BaseEntity } from '@decorators/baseEntity.decorator';
import { DriversEntity } from '@modules/Drivers/entities/drivers.entity';
import { VehiclesEntity } from '@modules/Vehicles/entities/vehicles.entity';
import { vehicleYardTables } from 'src/enums/dataBase';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity(vehicleYardTables.vehicleUsage)
export class VehicleUsageEntity extends BaseEntity {
  @ManyToOne(() => DriversEntity, { eager: true })
  @JoinColumn({ name: 'driver_id' })
  driver: DriversEntity;

  @ManyToOne(() => VehiclesEntity, { eager: true })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehiclesEntity;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'text' })
  reason: string;
}
