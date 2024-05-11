import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(REQUEST) private request: any,
  ) {}

  async create(request: CreateTaskDto) {
    request.user_id = this.request?.user?.id;
    const task = await this.prismaService.task.create({
      data: request,
    });

    if (!task) {
      throw new HttpException('Request is bad', HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.CREATED,
      data: task,
    };
  }

  async get(id: number) {
    const task = await this.prismaService.task.findFirst({
      where: {
        id: id,
        user_id: this.request?.user?.id,
      },
    });
    if (!task) {
      throw new HttpException('Task is not found!', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      data: task,
    };
  }

  async search() {
    const tasks = await this.prismaService.task.findMany({
      where: {
        user_id: this.request?.user?.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (!tasks) {
      throw new HttpException('Tasks are not found!', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      data: tasks,
    };
  }

  async update(id: number, request: UpdateTaskDto) {
    const task = await this.prismaService.task.update({
      where: {
        id: id,
        user_id: this.request?.user?.id,
      },
      data: request,
    });

    if (!task) {
      throw new HttpException('Request is bad', HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: HttpStatus.OK,
      data: task,
    };
  }

  /**
   *Delete Task
   *
   * @param {number} id
   * @memberof TaskService
   */
  async delete(id: number) {
    await this.prismaService.task
      .delete({
        where: {
          id: id,
          user_id: this.request?.user?.id,
        },
      })
      .catch((err) => {
        if (err) {
          throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
        }
      });

    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted successfully',
    };
  }
}
