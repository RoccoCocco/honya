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
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserDto, UserCreateDto, UserUpdateDto } from '@/core';
import { UserService } from '@/usecase';
import { ExceptionDto } from '../dto';

@ApiTags('User')
@Controller('/user')
@ApiUnauthorizedResponse({ type: ExceptionDto })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() dto: UserCreateDto): Promise<void> {
    this.userService.create('unknown', dto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.userService.delete('unknown', id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UserUpdateDto,
  ): Promise<void> {
    this.userService.update('unknown', id, updateDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.get(id);
  }
}
