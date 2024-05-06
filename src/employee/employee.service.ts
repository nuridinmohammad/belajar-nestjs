import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  LoginEmployeeRequest,
  RegisterEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeeResponse,
} from 'src/model/employee.model';
import { Logger } from 'winston';
import { EmployeeSchema } from './employee.schema';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async register(request: RegisterEmployeeRequest): Promise<EmployeeResponse> {
    this.logger.debug(`EmployeeService.register(${JSON.stringify(request)})`);
    const registerRequest: RegisterEmployeeRequest =
      this.validationService.validate(EmployeeSchema.REGISTER, request);

    const totalEmployeeWithSameEmployeename =
      await this.prismaService.employee.count({
        where: {
          username: registerRequest.username,
        },
      });

    if (totalEmployeeWithSameEmployeename !== 0) {
      throw new HttpException('Employeename is already exists', 400);
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const employee = await this.prismaService.employee.create({
      data: registerRequest,
    });

    return this.toEmployeeResponse(employee);
  }

  async login(request: LoginEmployeeRequest): Promise<EmployeeResponse> {
    this.logger.debug(`EmployeeService.login(${JSON.stringify(request)})`);

    const loginRequest: LoginEmployeeRequest = this.validationService.validate(
      EmployeeSchema.LOGIN,
      request,
    );

    let employee = await this.prismaService.employee.findUnique({
      where: {
        username: loginRequest.username,
      },
    });

    if (!employee) {
      throw new HttpException('Employeename or password is invalid!', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      employee.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Employeename or password is invalid!', 401);
    }

    employee = await this.prismaService.employee.update({
      where: {
        username: loginRequest.username,
      },
      data: {
        token: uuid(),
      },
    });

    return this.toEmployeeResponse(employee);
  }

  async toEmployeeResponse(employee: Employee): Promise<EmployeeResponse> {
    this.logger.debug(
      `EmployeeService.toEmployeeResponse(${JSON.stringify(employee)})`,
    );
    return {
      id: employee.id,
      username: employee.username,
      fullname: employee.fullname,
      rate: employee.rate,
      token: employee.token,
      created_at: employee.created_at.toISOString(),
      updated_at: employee.updated_at.toISOString(),
    };
  }

  async update(
    employee: Employee,
    request: UpdateEmployeeRequest,
  ): Promise<EmployeeResponse> {
    this.logger.debug(
      `EmployeeService.update(${JSON.stringify(employee)}, ${JSON.stringify(request)})`,
    );

    const updateRequest: UpdateEmployeeRequest =
      this.validationService.validate(EmployeeSchema.UPDATE, request);

    if (updateRequest.fullname) {
      employee.fullname = updateRequest.fullname;
    }

    if (updateRequest.rate) {
      employee.rate = updateRequest.rate;
    }

    if (updateRequest.password) {
      employee.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const result = await this.prismaService.employee.update({
      where: {
        username: employee.username,
      },
      data: employee,
    });

    return this.toEmployeeResponse(result);
  }

  async get(employee: Employee): Promise<EmployeeResponse> {
    this.logger.debug(`EmployeeService.get(${JSON.stringify(employee)})`);
    const result = await this.prismaService.employee.findFirst({
      where: {
        token: employee.token,
      },
    });
    return this.toEmployeeResponse(result);
  }
}
