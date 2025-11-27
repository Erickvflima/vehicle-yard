import { VehiclesListDto } from './dto/vehiclesList.dto';
import { VehiclesEntity } from './entities/vehicles.entity';

export class VehiclesFactory {
  static toListItem(vehicle: VehiclesEntity): VehiclesListDto {
    const dto = new VehiclesListDto();
    dto.id = vehicle.id;
    dto.plate = vehicle.plate;
    dto.model = vehicle.model;
    dto.color = vehicle.color;
    return dto;
  }

  static toListItems(vehicles: VehiclesEntity[]): VehiclesListDto[] {
    return vehicles.map((vehicle) => this.toListItem(vehicle));
  }
}
