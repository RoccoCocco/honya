import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';
import { UserDto } from './user.dto';

export class AuthenticationSignInDto extends PickType(UserDto, [
  'username',
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
