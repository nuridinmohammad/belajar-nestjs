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
  Query,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Auth } from '../common/auth.decorator';
import { Employee } from '@prisma/client';
import {
  CreateActivityRequest,
  SearchActivityRequest,
  ActivityResponse,
  UpdateActivityRequest,
} from 'src/model/activity.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/activities')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Auth() employee: Employee,
    @Body() request: CreateActivityRequest,
  ): Promise<WebResponse<ActivityResponse>> {
    const result = await this.activityService.create(employee, request);

    return {
      data: result,
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async getActivity(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) byId: number,
  ): Promise<WebResponse<ActivityResponse>> {
    const result = await this.activityService.getActivity(employee, byId);

    return {
      data: result,
    };
  }

  @Patch('/:id')
  @HttpCode(200)
  async update(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) byId: number,
    @Body() request: UpdateActivityRequest,
  ): Promise<WebResponse<ActivityResponse>> {
    request.id = byId;
    const result = await this.activityService.update(employee, request);
    return {
      data: result,
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  async remove(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) byId: number,
  ): Promise<WebResponse<boolean>> {
    await this.activityService.remove(employee, byId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() employee: Employee,
    @Query('title') title?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<ActivityResponse[]>> {
    const request: SearchActivityRequest = {
      title: title,
      page: page || 1,
      size: size || 10,
      project: '',
    };
    return this.activityService.search(employee, request);
  }
}
