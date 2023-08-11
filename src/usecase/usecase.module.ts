import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DataService, PersistenceModule } from '@/persistence';

import { AuthenticationService, BookService, UserService } from './services';
import { DATA_SERVICE } from './usecase.tokens';

const services = [AuthenticationService, BookService, UserService] as const;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'static-secret',
      signOptions: { expiresIn: '300s' },
    }),
    PersistenceModule,
  ],
  providers: [{ provide: DATA_SERVICE, useExisting: DataService }, ...services],
  exports: [...services],
})
export class UseCaseModule {}
