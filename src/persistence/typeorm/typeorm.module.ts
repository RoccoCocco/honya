import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule as CoreTypeOrmModule } from '@nestjs/typeorm';

import { BookEntity, PasswordVaultEntity, UserEntity } from './entities';
import {
  TypeOrmBookEntityRepository,
  TypeOrmPasswordVaultRepository,
  TypeOrmUserEntityRepository,
} from './repositories';
import { TypeOrmConfigurationFactory } from './typeorm.configuration';

const entities = [BookEntity, UserEntity, PasswordVaultEntity];
const repositories = [
  TypeOrmBookEntityRepository,
  TypeOrmUserEntityRepository,
  TypeOrmPasswordVaultRepository,
];

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreTypeOrmModule.forRootAsync({
      extraProviders: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          ...TypeOrmConfigurationFactory.make({
            host: config.get('TYPEORM_HOST'),
            port: config.get('TYPEORM_PORT'),
            username: config.get('TYPEORM_USERNAME'),
            password: config.get('TYPEORM_PASSWORD'),
            database: config.get('TYPEORM_DATABASE'),
          }),
          entities,
        };
      },
      inject: [ConfigService],
    }),

    CoreTypeOrmModule.forFeature(entities),
  ],
  providers: [...repositories],
  exports: [...repositories],
})
export class TypeOrmModule {}
