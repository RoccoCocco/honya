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
  BookDto,
  BookCreateDto,
  BookUpdateDto,
  BookListDto,
} from '@/core';
import { BookService } from '@/usecase';
import { UseUserAuthentication, AuthenticatedUser } from '../decorators';

@ApiTags('Books')
@Controller('/books')
@UseUserAuthentication()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse()
  async create(
    @Body() dto: BookCreateDto,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.bookService.create(authenticatedUser, dto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.bookService.delete(authenticatedUser, id);
  }

  @Put(':id')
  @ApiOkResponse({ type: BookDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BookUpdateDto,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserDto,
  ): Promise<void> {
    await this.bookService.update(authenticatedUser, id, dto);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<BookDto> {
    return this.bookService.get(id);
  }

  @Get()
  @ApiOkResponse({ type: BookListDto })
  async getAll(): Promise<BookListDto> {
    return this.bookService.getAll();
  }
}
