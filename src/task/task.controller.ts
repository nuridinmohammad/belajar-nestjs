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
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tasks')
@ApiBearerAuth('accessToken')
@Controller('/api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(201)
  async create(@Body() request: CreateTaskDto) {
    return this.taskService.create(request);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async get(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.get(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(200)
  async search() {
    return this.taskService.search();
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateTaskDto,
  ) {
    return this.taskService.update(id, request);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
