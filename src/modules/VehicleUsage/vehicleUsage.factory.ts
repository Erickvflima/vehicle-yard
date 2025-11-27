import { VehicleUsageEntity } from './entities/vehicleUsage.entity';

export class VehicleUsageFactory {
  static toListItems(usages: VehicleUsageEntity[]) {
    return usages.map((usage) => ({
      id: usage.id,
      startDate: usage.startDate,
      endDate: usage.endDate,
      reason: usage.reason,
      driver: {
        id: usage.driver.id,
        name: usage.driver.name,
      },
      vehicle: {
        id: usage.vehicle.id,
        plate: usage.vehicle.plate,
        model: usage.vehicle.model,
        color: usage.vehicle.color,
      },
    }));
  }
}
