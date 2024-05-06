import { Body, Controller, Get, HttpCode, Patch, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  LoginEmployeeRequest,
  RegisterEmployeeRequest,
  UpdateEmployeeRequest,
  EmployeeResponse,
} from '../model/employee.model';
import { WebResponse } from 'src/model/web.model';
import { Auth } from '../common/auth.decorator';
import { Employee } from '@prisma/client';

@Controller('/api/employees')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post()
  @HttpCode(201)
  async register(
    @Body() request: RegisterEmployeeRequest,
  ): Promise<WebResponse<EmployeeResponse>> {
    const result = await this.employeeService.register(request);
    return {
      data: result,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async login(
    @Body() request: LoginEmployeeRequest,
  ): Promise<WebResponse<EmployeeResponse>> {
    const result = await this.employeeService.login(request);
    return {
      data: result,
    };
  }

  @Get('/current')
  @HttpCode(200)
  async get(
    @Auth() employee: Employee,
  ): Promise<WebResponse<EmployeeResponse>> {
    const result = await this.employeeService.get(employee);
    return {
      data: result,
    };
  }

  @Patch('/current')
  @HttpCode(200)
  async update(
    @Auth() employee: Employee,
    @Body() request: UpdateEmployeeRequest,
  ): Promise<WebResponse<EmployeeResponse>> {
    const result = await this.employeeService.update(employee, request);

    return {
      data: result,
    };
  }
}
