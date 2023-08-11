import {
  Controller,
  Body,
  Get,
  Put,
  Delete,
  Post,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  AuthenticatedUserDto,
  UserDto,
  UserCreateDto,
  UserUpdateDto,
  UserListDto,
} from '@/core';
import { UserService } from '@/usecase';
import {
  AuthenticatedUser,
  UseUserAuthentication,
  CatchSerializeAndValidate,
} from '../decorators';

@ApiTags('Users')
@Controller('/users')
@UseUserAuthentication()
@CatchSerializeAndValidate()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse()
  async create(
    @Body() dto: UserCreateDto,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.userService.create(authenticatedUser, dto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.userService.delete(authenticatedUser, id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UserUpdateDto,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.userService.update(authenticatedUser, id, updateDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.get(id);
  }

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  async getAll(): Promise<UserListDto> {
    return this.userService.getAll();
  }
}
