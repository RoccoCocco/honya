import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  AuthenticatedUserDto,
  BookListDto,
  BookQueryDto,
  UserCreateDto,
  UserDto,
  UserListDto,
  UserQueryDto,
  UserUpdateDto,
} from '@/core';
import { BookService, UserService } from '@/usecase';

import {
  AuthenticatedUser,
  CatchSerializeAndValidate,
  UseUserAuthentication,
} from '../decorators';

@ApiTags('Users')
@Controller('/users')
@UseUserAuthentication()
@CatchSerializeAndValidate()
export class UserController {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  async create(
    @Body() dto: UserCreateDto,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<UserDto> {
    return this.userService.create(authenticatedUser, dto);
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

  @Get(':id/books')
  @ApiOkResponse({ type: UserDto })
  async getBooksForUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: BookQueryDto,
  ): Promise<BookListDto> {
    return this.bookService.getAllByAuthor(id, query);
  }

  @Get()
  @ApiOkResponse({ type: UserListDto })
  async getAll(@Query() query: UserQueryDto): Promise<UserListDto> {
    return this.userService.getAll(query);
  }
}
