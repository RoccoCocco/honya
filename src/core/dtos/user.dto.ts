import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserRoleEnum } from '../models';
import {
  IsUUID,
  IsEnum,
  Length,
  ValidateNested,
  IsAlphanumeric,
  IsLowercase,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @Length(4, 30)
  @IsAlphanumeric()
  @IsLowercase()
  username!: string;

  @ApiProperty()
  @Length(2, 30)
  firstName!: string;

  @ApiProperty()
  @Length(2, 30)
  lastName!: string;

  @ApiProperty({ enum: UserRoleEnum })
  @IsEnum(UserRoleEnum)
  role!: UserRoleEnum;
}

export class UserUpdateDto extends OmitType(UserDto, ['id'] as const) {}

export class UserCreateDto extends OmitType(UserDto, ['id'] as const) {}

export class UserListDto {
  @ApiProperty({
    type: UserDto,
    isArray: true,
  })
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  items!: Array<UserDto>;
}
