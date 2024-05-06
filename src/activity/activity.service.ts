import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Activity, Employee } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  CreateActivityRequest,
  SearchActivityRequest,
  ActivityResponse,
  UpdateActivityRequest,
} from 'src/model/activity.model';
import { Logger } from 'winston';
import { ActivitySchema } from './activity.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class ActivityService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(
    employee: Employee,
    request: CreateActivityRequest,
  ): Promise<ActivityResponse> {
    this.logger.debug(
      `ActivityService.create(${JSON.stringify(employee)}, ${JSON.stringify(request)})`,
    );
    const activityRequest: CreateActivityRequest =
      this.validationService.validate(ActivitySchema.CREATE, request);

    const activity = await this.prismaService.activity.create({
      data: {
        ...activityRequest,
        ...{
          username: employee.username,
        },
      },
    });

    return this.toActivityResponse(activity);
  }

  toActivityResponse(activity: Activity): ActivityResponse {
    return {
      id: activity.id,
      title: activity.title,
      created_at: activity.created_at.toISOString(),
      updated_at: activity.updated_at.toISOString(),
      start_date: activity.start_date.toISOString(),
      end_date: activity.end_date.toISOString(),
      start_time: activity.start_time.toISOString(),
      end_time: activity.end_time.toISOString(),
    };
  }

  async checkActivityMustBeExist(employee: Employee, byId: number) {
    const activity = await this.prismaService.activity.findFirst({
      where: {
        id: byId,
        employee_id: employee.id,
      },
    });

    if (!activity) {
      throw new HttpException('Activity not found', 404);
    }
    return activity;
  }

  async getActivity(
    employee: Employee,
    byId: number,
  ): Promise<ActivityResponse> {
    this.logger.debug(
      `ActivityService.getActivity(${JSON.stringify(employee)}, ${JSON.stringify(byId)})`,
    );
    const activity = await this.checkActivityMustBeExist(employee, byId);
    return this.toActivityResponse(activity);
  }

  async update(
    employee: Employee,
    request: UpdateActivityRequest,
  ): Promise<ActivityResponse> {
    this.logger.debug(
      `ActivityService.update(${JSON.stringify(employee)}, ${JSON.stringify(request)})`,
    );

    const activityRequest: UpdateActivityRequest =
      await this.validationService.validate(ActivitySchema.UPDATE, request);

    let activity = await this.checkActivityMustBeExist(
      employee,
      activityRequest.id,
    );

    activity = await this.prismaService.activity.update({
      where: {
        id: activity.id,
        employee_id: employee.id,
      },
      data: activityRequest,
    });

    return this.toActivityResponse(activity);
  }

  async remove(employee: Employee, id: number): Promise<ActivityResponse> {
    await this.checkActivityMustBeExist(employee, id);

    const activity = await this.prismaService.activity.delete({
      where: {
        id: id,
        employee_id: employee.id,
      },
    });

    return this.toActivityResponse(activity);
  }

  async search(
    employee: Employee,
    request: SearchActivityRequest,
  ): Promise<WebResponse<ActivityResponse[]>> {
    this.logger.debug(`ActivityService.seacr(${employee}, ${request})`);
    const searchRequest: SearchActivityRequest =
      this.validationService.validate(ActivitySchema.SEARCH, request);

    const filters = [];

    if (searchRequest.title) {
      // add email filter
      filters.push({
        title: {
          contains: searchRequest.title,
        },
      });
    }

    if (searchRequest.project) {
      // add name filter
      filters.push({
        OR: [
          {
            project: {
              contains: searchRequest.project,
            },
          },
        ],
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const activity = await this.prismaService.activity.findMany({
      where: {
        employee_id: employee.id,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.activity.count({
      where: {
        employee_id: employee.id,
        AND: filters,
      },
    });

    return {
      data: activity.map((item) => this.toActivityResponse(item)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
