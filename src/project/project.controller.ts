import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { WebResponse } from 'src/model/web.model';
import {
  CreateProjectRequest,
  ProjectResponse,
  SearchProjectRequest,
  UpdateProjectRequest,
} from '../model/project.model';
import { Auth } from '../common/auth.decorator';
import { Employee } from '@prisma/client';

@Controller('api/projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() request: CreateProjectRequest,
    @Auth() employee: Employee,
  ): Promise<WebResponse<ProjectResponse>> {
    const result = await this.projectService.create(employee, request);
    return {
      data: result,
    };
  }

  @Get('/:id')
  @HttpCode(200)
  async get(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WebResponse<ProjectResponse>> {
    const result = await this.projectService.get(employee, id);
    return {
      data: result,
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  async remove(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WebResponse<boolean>> {
    await this.projectService.remove(employee, Number(id));
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() employee: Employee,
    @Query('name') name?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<ProjectResponse[]>> {
    const request: SearchProjectRequest = {
      name: name,
      page: page || 1,
      size: size || 10,
    };
    const result = await this.projectService.search(employee, request);
    return result;
  }

  @Put('/:id')
  @HttpCode(200)
  async update(
    @Auth() employee: Employee,
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateProjectRequest,
  ): Promise<WebResponse<ProjectResponse>> {
    request.id = id;
    const result = await this.projectService.update(employee, request);
    return {
      data: result,
    };
  }
}
