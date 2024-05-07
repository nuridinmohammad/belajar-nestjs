import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  CreateProjectRequest,
  ProjectResponse,
  SearchProjectRequest,
  UpdateProjectRequest,
} from 'src/model/project.model';
import { Logger } from 'winston';
import { ProjectSchema } from './project.schema';
import { Employee, Project } from '@prisma/client';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class ProjectService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async create(
    employee: Employee,
    request: CreateProjectRequest,
  ): Promise<ProjectResponse> {
    this.logger.debug(
      `ProjectService.create(${JSON.stringify(request)}, ${JSON.stringify(employee)})`,
    );
    const projectRequest: CreateProjectRequest =
      this.validationService.validate(ProjectSchema.CREATE, request);

    const hasEmployeeToken = await this.prismaService.employee.findFirst({
      where: {
        token: employee.token,
      },
    });

    if (!hasEmployeeToken) {
      throw new HttpException('Unauthorized', 401);
    }

    const totalProjectWithNameSame = await this.prismaService.project.count({
      where: {
        name: projectRequest.name,
      },
    });

    if (totalProjectWithNameSame !== 0) {
      throw new HttpException('Project is already exists', 400);
    }

    const project = await this.prismaService.project.create({
      data: projectRequest,
    });

    return this.toProjectResponse(project);
  }

  async toProjectResponse(project: Project): Promise<ProjectResponse> {
    this.logger.debug(
      `ProjectService.toProjectResponse(${JSON.stringify(project)})`,
    );
    return {
      id: project.id,
      name: project.name,
      created_at: project.created_at.toISOString(),
      updated_at: project.updated_at.toISOString(),
    };
  }

  async get(employee: Employee, id: number): Promise<ProjectResponse> {
    this.logger.debug(
      `ProjectService.get(${JSON.stringify(employee)}, ${JSON.stringify(id)})`,
    );
    if (typeof id !== 'number') {
      throw new HttpException('Not a number', 400);
    }

    const project = await this.prismaService.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!project) {
      throw new HttpException('Project not found!', 404);
    }

    return this.toProjectResponse(project);
  }

  async remove(employee: Employee, id: number) {
    this.logger.debug(
      `ProjectService.remove(${JSON.stringify(employee)}, ${JSON.stringify(id)})`,
    );

    await this.get(employee, id);

    await this.prismaService.project.delete({
      where: {
        id: id,
      },
    });
  }

  async search(
    employee: Employee,
    request: SearchProjectRequest,
  ): Promise<WebResponse<ProjectResponse[]>> {
    this.logger.debug(`Project.search(${employee}, ${request})`);
    const searchRequest: SearchProjectRequest = this.validationService.validate(
      ProjectSchema.SEARCH,
      request,
    );

    const filters = [];

    if (searchRequest.name) {
      // add phone filter
      filters.push({
        name: {
          contains: searchRequest.name,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const projects = await this.prismaService.project.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.project.count({
      where: {
        AND: filters,
      },
    });

    const projectResponses = await Promise.all(
      projects.map((project) => this.toProjectResponse(project)),
    );

    return {
      data: projectResponses,
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }

  async update(
    employee: Employee,
    request: UpdateProjectRequest,
  ): Promise<ProjectResponse> {
    this.logger.debug(`Project.update(${employee}, ${request})`);
    const updateRequest: UpdateProjectRequest = this.validationService.validate(
      ProjectSchema.UPDATE,
      request,
    );

    let projectMustBeExist = await this.prismaService.project.findFirst({
      where: {
        id: updateRequest.id,
      },
    });

    if (!projectMustBeExist) {
      throw new HttpException('Project not found!', 404);
    }

    projectMustBeExist = await this.prismaService.project.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return this.toProjectResponse(projectMustBeExist);
  }
}
