import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import {
  AuthenticatedUserDto,
  AuthenticationSignInDto,
  AuthenticationSignInResponseDto,
  AuthenticationSignUpDto,
  IDataService,
  Unauthorized,
  UserRoleEnum,
  UserStatusEnum,
} from '@/core';

import { UserFactory } from '../factories';
import { JwtSecret } from '../usecase.module';
import { DATA_SERVICE, JWT_SECRET_PROVIDER } from '../usecase.tokens';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(DATA_SERVICE)
    private readonly dataService: IDataService,
    @Inject(JWT_SECRET_PROVIDER) private readonly jwtSecret: JwtSecret,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: AuthenticationSignUpDto): Promise<void> {
    const user = UserFactory.signUp(signUpDto);

    // NOTE for demoing, should be author
    user.role = UserRoleEnum.Admin;
    user.status = UserStatusEnum.Active;

    const createdUser = await this.dataService.user.create(user);
    const passwordHash = await hash(signUpDto.password, 10);

    await this.dataService.passwordVault.create({
      id: createdUser.id,
      passwordHash,
    });
  }

  async signIn(
    signInDto: AuthenticationSignInDto,
  ): Promise<AuthenticationSignInResponseDto> {
    const user = await this.dataService.user.getOneByUsername(
      signInDto.username,
    );

    if (!user) {
      throw new Unauthorized();
    }

    const passwordVault = await this.dataService.passwordVault.getById(user.id);

    if (!passwordVault) {
      throw new Unauthorized();
    }

    const matches = await compare(
      signInDto.password,
      passwordVault.passwordHash,
    );

    if (matches === false) {
      throw new Unauthorized();
    }

    const response = new AuthenticationSignInResponseDto();

    response.accessToken = await this.jwtService.signAsync({
      id: user.id,
      role: user.role,
      username: user.username,
      status: user.status,
    });

    return response;
  }

  async verify(token: string) {
    const data = await this.jwtService.verifyAsync(token, {
      secret: this.jwtSecret,
    });

    const dto = plainToClass(AuthenticatedUserDto, data);
    await validateOrReject(dto);

    return dto;
  }
}
