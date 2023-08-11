import { plainToClass, Type } from 'class-transformer';
import { IsDefined, IsInt, validateSync } from 'class-validator';
import { DataSourceOptions } from 'typeorm';

export class DataSourceConfiguration {
  @IsDefined()
  host!: string;

  @IsDefined()
  @Type(() => Number)
  @IsInt()
  port!: number;

  @IsDefined()
  username!: string;

  @IsDefined()
  password!: string;

  @IsDefined()
  database!: string;
}

export class TypeOrmConfigurationFactory {
  static make(data: DataSourceConfiguration | unknown): DataSourceOptions {
    const configuration = plainToClass(DataSourceConfiguration, data);
    const validation = validateSync(configuration);

    if (validation.length) {
      throw new Error(JSON.stringify(validation, null, 2));
    }

    return { ...configuration, type: 'postgres' };
  }
}
