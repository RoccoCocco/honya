import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {
  AuthenticationSignInDto,
  AuthenticationSignInResponseDto,
  IDataService,
  AuthenticatedUserDto,
  Unauthorized,
} from '@/core';
import { DATA_SERVICE } from '../usecase.tokens';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(DATA_SERVICE)
    private readonly dataService: IDataService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    signInDto: AuthenticationSignInDto,
  ): Promise<AuthenticationSignInResponseDto> {
    const user = await this.dataService.user.getOneByUsername(
      signInDto.username,
    );

    if (!user) {
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
