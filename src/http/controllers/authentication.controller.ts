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
} from '@/core';
import { AuthenticationService } from '@/usecase';
import { ExceptionDto } from '../dto';
import { CatchSerializeAndValidate } from '../decorators';

@ApiTags('Authentication')
@Controller('/authentication')
@ApiUnauthorizedResponse({ type: ExceptionDto })
@CatchSerializeAndValidate()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  @ApiCreatedResponse()
  @ApiOkResponse({ type: AuthenticationSignInResponseDto })
  async signIn(
    @Body() dto: AuthenticationSignInDto,
  ): Promise<AuthenticationSignInResponseDto> {
    return this.authenticationService.signIn(dto);
  }
}
