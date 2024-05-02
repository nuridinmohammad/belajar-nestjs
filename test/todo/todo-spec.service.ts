import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/prisma.service';
import { UserServiceTest } from '../user/user-spec.service';

@Injectable()
export class TodoServiceTest {
  constructor(
    private prismaService: PrismaService,
    private userServiceTest: UserServiceTest,
  ) {}

  async deleteAll() {
    await this.deleteTodos();
    await this.userServiceTest.deleteUsers();
  }

  async deleteTodos() {
    await this.prismaService.todo.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async createTodo() {
    await this.prismaService.todo.create({
      data: {
        username: 'test',
        title: 'test',
        body: 'test',
      },
    });
  }

  async getTodo() {
    return await this.prismaService.todo.findFirst({
      where: {
        username: 'test',
      },
    });
  }
}
