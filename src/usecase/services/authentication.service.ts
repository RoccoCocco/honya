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
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(DATA_SERVICE)
    private readonly dataService: IDataService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: AuthenticationSignUpDto): Promise<void> {
    const user = new UserFactory().signUp(signUpDto);

    // NOTE for demoing, should be author
    user.role = UserRoleEnum.Admin;
    user.status = UserStatusEnum.Active;

    const userId = await this.dataService.user.create(user);
    const passwordHash = await hash(signUpDto.password, 10);

    await this.dataService.passwordVault.create({ id: userId, passwordHash });
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
      secret: 'static-secret',
    });

    const dto = plainToClass(AuthenticatedUserDto, data);
    await validateOrReject(dto);

    return dto;
  }
}
