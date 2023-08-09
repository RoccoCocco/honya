import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserRoleEnum } from '../models';
import { IsUUID, IsEnum, Length } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  id = '';

  @ApiProperty()
  @Length(2, 30)
  firstName = '';

  @ApiProperty()
  @Length(2, 30)
  lastName = '';

  @ApiProperty({ enum: UserRoleEnum })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum = UserRoleEnum.Author;
}

export class UserUpdateDto extends OmitType(UserDto, ['id'] as const) {}

export class UserCreateDto extends OmitType(UserDto, ['id'] as const) {}
