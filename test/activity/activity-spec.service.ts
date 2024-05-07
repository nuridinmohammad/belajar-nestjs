import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/prisma.service';

@Injectable()
export class ActivityServiceTest {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteActvities();
  }

  async deleteActvities() {
    await this.prismaService.activity.deleteMany({
      where: {
        title: 'test',
      },
    });
  }

  async create() {
    await this.prismaService.activity.create({
      data: {
        title: 'test',
        start_date: new Date(),
        end_date: new Date(),
        start_time: new Date(),
        end_time: new Date(),
        employee_id: (await this.getEmployee()).id,
        project_id: (await this.getProject()).id,
      },
    });
  }

  async get() {
    return await this.prismaService.activity.findFirst({
      where: {
        title: 'test',
      },
    });
  }

  async getEmployee() {
    return await this.prismaService.employee.findUnique({
      where: { username: 'test' },
    });
  }

  async getProject() {
    return await this.prismaService.project.findUnique({
      where: { name: 'test' },
    });
  }
}
