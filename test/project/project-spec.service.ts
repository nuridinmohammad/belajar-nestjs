import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/common/prisma.service';

@Injectable()
export class ProjectServiceTest {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteProjects();
  }

  async deleteProjects() {
    await this.prismaService.project.deleteMany({
      where: {
        name: 'test',
      },
    });
  }

  async create() {
    await this.prismaService.project.create({
      data: {
        name: 'test',
      },
    });
  }

  async getProject() {
    return await this.prismaService.project.findFirst({
      where: {
        name: 'test',
      },
    });
  }
}
