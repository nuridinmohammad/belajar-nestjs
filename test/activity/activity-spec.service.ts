import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/prisma.service';

@Injectable()
export class EmployeeServiceTest {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteActvities();
  }

  async deleteActvities() {
    await this.prismaService.activity.deleteMany({
      where: {
        employee: {
          username: 'test',
        },
      },
    });
  }

  async create() {
    await this.prismaService.activity.create({
      data: {
        title: 'test',
        start_date: '2022-03-25',
        end_date: '2022-03-26',
        start_time: '10:00:00',
        end_time: '13:00:00',
      },
    });
  }
}
