import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  AuthenticationSignInDto,
  AuthenticationSignInResponseDto,
  AuthenticationSignUpDto,
  ExceptionDto,
} from '@/core';
import { AuthenticationService } from '@/usecase';

import { CatchSerializeAndValidate } from '../decorators';

@ApiTags('Authentication')
@Controller('/authentication')
@CatchSerializeAndValidate()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  @ApiOkResponse({ type: AuthenticationSignInResponseDto })
  @ApiUnauthorizedResponse({ type: ExceptionDto })
  async signIn(
    @Body() dto: AuthenticationSignInDto,
  ): Promise<AuthenticationSignInResponseDto> {
    return this.authenticationService.signIn(dto);
  }

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(@Body() dto: AuthenticationSignUpDto): Promise<void> {
    return this.authenticationService.signUp(dto);
  }
}
