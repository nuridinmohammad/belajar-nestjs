import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(request: CreateTaskDto) {
    const task = await this.prismaService.tasks.create({
      data: request,
    });

    return {
      statusCode: 201,
      data: task,
    };
  }

  async get(id: number) {
    const task = await this.prismaService.tasks.findFirst({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      data: task,
    };
  }

  async search() {
    return await this.prismaService.tasks.findMany();
  }

  async update(id: number, request: UpdateTaskDto) {
    return await this.prismaService.tasks.update({
      where: {
        id: id,
      },
      data: request,
    });
  }

  async delete(id: number) {
    return await this.prismaService.tasks.delete({
      where: {
        id: id,
      },
    });
  }
}
