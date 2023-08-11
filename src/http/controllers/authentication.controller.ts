import { Controller, Body, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  AuthenticationSignInDto,
  AuthenticationSignInResponseDto,
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
  @ApiCreatedResponse()
  @ApiOkResponse({ type: AuthenticationSignInResponseDto })
  @ApiUnauthorizedResponse({ type: ExceptionDto })
  async signIn(
    @Body() dto: AuthenticationSignInDto,
  ): Promise<AuthenticationSignInResponseDto> {
    return this.authenticationService.signIn(dto);
  }
}
