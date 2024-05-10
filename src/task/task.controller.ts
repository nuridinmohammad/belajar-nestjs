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
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './data/tasks';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('/api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() request: CreateTaskDto) {
    return this.taskService.create(request);
  }

  @Get('/:id')
  @HttpCode(200)
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.get(id);
  }

  @Get()
  @HttpCode(200)
  async search(): Promise<Task[]> {
    return this.taskService.search();
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, request);
  }

  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
