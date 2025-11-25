import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const createDataSource = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: 'vehicleYard',
  schema: 'dbo',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  synchronize: false,
  logging: ['error'],
  cache: {
    type: 'database',
    tableName: 'query_result_cache_vehicles',
    duration: 60000,
  },
  extra: { trustServerCertificate: true },
});
