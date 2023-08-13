import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { DataService, PersistenceModule } from '@/persistence';

import { AuthenticationService, BookService, UserService } from './services';
import { DATA_SERVICE, JWT_SECRET_PROVIDER } from './usecase.tokens';

const services = [AuthenticationService, BookService, UserService] as const;

export type JwtSecret = string;

@Module({
  imports: [
    ConfigModule,
    PersistenceModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory(config: ConfigService) {
        const secret = UseCaseModule.getJwtSecret(config);

        return { global: true, secret, signOptions: { expiresIn: '300s' } };
      },
    }),
  ],
  providers: [
    ...services,
    { provide: DATA_SERVICE, useExisting: DataService },
    {
      provide: JWT_SECRET_PROVIDER,
      inject: [ConfigService],
      useFactory: UseCaseModule.getJwtSecret,
    },
  ],
  exports: [...services, JWT_SECRET_PROVIDER],
})
export class UseCaseModule {
  static JWT_SECRET = 'JWT_SECRET';

  static getJwtSecret(config: ConfigService): JwtSecret {
    const secret = config.get<string>(UseCaseModule.JWT_SECRET);

    if (!secret) {
      throw new Error(`${UseCaseModule.JWT_SECRET} is required`);
    }

    return secret;
  }
}
