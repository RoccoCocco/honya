import { plainToClass } from 'class-transformer';
import { join } from 'path';
import { DataSource } from 'typeorm';

import {
  DataSourceConfiguration,
  TypeOrmConfigurationFactory,
} from './typeorm.configuration';

export const AppDataSource = new DataSource({
  ...TypeOrmConfigurationFactory.make(
    plainToClass(DataSourceConfiguration, {
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
    }),
  ),
  entities: [join(__dirname, '/entities/*.entity.ts')],
  migrations: [join(__dirname, '/migrations/*.ts')],
});
