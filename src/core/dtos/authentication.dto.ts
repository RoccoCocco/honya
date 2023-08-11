import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsJWT, Length } from 'class-validator';

import { UserDto } from './user.dto';

export class AuthenticationSignUpDto extends PickType(UserDto, [
  'username',
  'firstName',
  'lastName',
] as const) {
  @ApiProperty()
  @Length(8, 50)
  password!: string;
}

export class AuthenticationSignInDto extends PickType(AuthenticationSignUpDto, [
  'username',
  'password',
] as const) {}

export class AuthenticationSignInResponseDto {
  @ApiProperty()
  @IsJWT()
  accessToken!: string;
}

export class AuthenticatedUserDto extends PickType(UserDto, [
  'id',
  'username',
  'role',
  'status',
] as const) {}
