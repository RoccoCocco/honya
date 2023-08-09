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
import { BookDto, BookCreateDto, BookUpdateDto } from '@/core';
import { BookService } from '@/usecase';
import { ExceptionDto } from '../dto';

@ApiTags('Book')
@Controller('/book')
@ApiUnauthorizedResponse({ type: ExceptionDto })
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiCreatedResponse()
  async create(@Body() dto: BookCreateDto): Promise<void> {
    await this.bookService.create('unknown', dto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.bookService.delete('unknown', id);
  }

  @Put(':id')
  @ApiOkResponse({ type: BookDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: BookUpdateDto,
  ): Promise<void> {
    await this.bookService.update('unknown', id, dto);
  }

  @Get(':id')
  @ApiOkResponse({ type: BookDto })
  async get(@Param('id', ParseUUIDPipe) id: string): Promise<BookDto> {
    return this.get(id);
  }
}
