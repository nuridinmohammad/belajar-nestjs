import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SchoolService {
  constructor(private prismaService: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto) {
    return await this.prismaService.school.create({
      data: createSchoolDto,
    });
  }

  async findAll() {
    return await this.prismaService.school.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.school.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateSchoolDto: UpdateSchoolDto) {
    return await this.prismaService.school.update({
      where: {
        id,
      },
      data: updateSchoolDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.school.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Deleted successfully!',
    };
  }
}
