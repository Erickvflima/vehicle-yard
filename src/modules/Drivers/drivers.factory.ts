import { DriversListDto } from './dto/driversList.dto';
import { DriversEntity } from './entities/drivers.entity';

export class DriversFactory {
  static toListItem(driver: DriversEntity): DriversListDto {
    const dto = new DriversListDto();
    dto.name = driver.name;
    dto.id = driver.id;

    return dto;
  }

  static toListItems(drivers: DriversEntity[]): DriversListDto[] {
    return drivers.map((vehicle) => this.toListItem(vehicle));
  }
}
