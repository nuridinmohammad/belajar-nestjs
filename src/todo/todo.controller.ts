import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';
import {
  CreateTodoRequest,
  SearchTodoRequest,
  TodoResponse,
  UpdateTodoRequest,
} from 'src/model/todo.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @HttpCode(201)
  async ccreate(
    @Auth() user: User,
    @Body() request: CreateTodoRequest,
  ): Promise<WebResponse<TodoResponse>> {
    const result = await this.todoService.create(user, request);

    return {
      data: result,
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async getTodo(
    @Auth() user: User,
    @Param('id', ParseIntPipe) byId: number,
  ): Promise<WebResponse<TodoResponse>> {
    const result = await this.todoService.getTodo(user, byId);

    return {
      data: result,
    };
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('id', ParseIntPipe) byId: number,
    @Body() request: UpdateTodoRequest,
  ): Promise<WebResponse<TodoResponse>> {
    request.id = byId;
    const result = await this.todoService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('id', ParseIntPipe) byId: number,
  ): Promise<WebResponse<boolean>> {
    await this.todoService.remove(user, byId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('title') title?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<TodoResponse[]>> {
    const request: SearchTodoRequest = {
      title: title,
      page: page || 1,
      size: size || 10,
    };
    return this.todoService.search(user, request);
  }
}
