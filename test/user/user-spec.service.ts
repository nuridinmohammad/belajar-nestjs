import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../src/common/prisma.service';

@Injectable()
export class UserServiceTest {
  constructor(private prismaService: PrismaService) {}

  async deleteAll() {
    await this.deleteUsers();
  }

  async deleteUsers() {
    await this.prismaService.user.deleteMany({
      where: {
        username: 'test',
      },
    });
  }

  async register() {
    await this.prismaService.user.create({
      data: {
        username: 'test',
        fullname: 'test',
        password: await bcrypt.hash('test', 10),
        token: 'test',
      },
    });
  }
}
