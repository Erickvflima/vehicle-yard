import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSource } from './config/data.source';
import { VehiclesModule } from '@modules/Vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = createDataSource(configService);
        Logger.verbose('Banco de dados configurado com sucesso!');
        return options;
      },
    }),
    VehiclesModule,
  ],
})
export class AppModule {}
