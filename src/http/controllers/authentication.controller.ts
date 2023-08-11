import { Controller, Body, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  AuthenticationSignInDto,
  AuthenticationSignUpDto,
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
