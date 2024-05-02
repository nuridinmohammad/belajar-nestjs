import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Todo, User } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  CreateTodoRequest,
  SearchTodoRequest,
  TodoResponse,
  UpdateTodoRequest,
} from 'src/model/todo.model';
import { Logger } from 'winston';
import { TodoSchema } from './todo.schema';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { WebResponse } from 'src/model/web.model';

@Injectable()
export class TodoService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private validationService: ValidationService,
  ) {}

  async create(user: User, request: CreateTodoRequest): Promise<TodoResponse> {
    this.logger.debug(
      `TodoService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const todoRequest: CreateTodoRequest = this.validationService.validate(
      TodoSchema.CREATE,
      request,
    );

    const todo = await this.prismaService.todo.create({
      data: {
        ...todoRequest,
        ...{
          username: user.username,
          category_name: todoRequest.category_name,
        },
      },
    });

    return this.toTodoResponse(todo);
  }

  toTodoResponse(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      body: todo.body,
      created_at: todo.created_at.toISOString(),
      updated_at: todo.update_at.toISOString(),
      category_name: todo.category_name,
    };
  }

  async checkTodoMustBeExist(user: User, byId: number) {
    const todo = await this.prismaService.todo.findFirst({
      where: {
        id: byId,
        username: user.username,
      },
    });

    if (!todo) {
      throw new HttpException('Todo not found', 404);
    }
    return todo;
  }

  async getTodo(user: User, byId: number): Promise<TodoResponse> {
    this.logger.debug(
      `TodoService.getTodo(${JSON.stringify(user)}, ${JSON.stringify(byId)})`,
    );
    const todo = await this.checkTodoMustBeExist(user, byId);
    return this.toTodoResponse(todo);
  }

  async update(user: User, request: UpdateTodoRequest): Promise<TodoResponse> {
    this.logger.debug(
      `TodoService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );

    const todoRequest: UpdateTodoRequest =
      await this.validationService.validate(TodoSchema.UPDATE, request);

    let todo = await this.checkTodoMustBeExist(user, todoRequest.id);

    todo = await this.prismaService.todo.update({
      where: {
        id: todo.id,
        username: user.username,
      },
      data: todoRequest,
    });

    return this.toTodoResponse(todo);
  }

  async remove(user: User, id: number): Promise<TodoResponse> {
    await this.checkTodoMustBeExist(user, id);

    const todo = await this.prismaService.todo.delete({
      where: {
        id: id,
        username: user.username,
      },
    });

    return this.toTodoResponse(todo);
  }

  async search(
    user: User,
    request: SearchTodoRequest,
  ): Promise<WebResponse<TodoResponse[]>> {
    this.logger.debug(`TodoService.seacr(${user}, ${request})`);
    const searchRequest: SearchTodoRequest = this.validationService.validate(
      TodoSchema.SEARCH,
      request,
    );

    const filters = [];

    if (searchRequest.title) {
      // add email filter
      filters.push({
        title: {
          contains: searchRequest.title,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const todo = await this.prismaService.todo.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.todo.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    return {
      data: todo.map((item) => this.toTodoResponse(item)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
