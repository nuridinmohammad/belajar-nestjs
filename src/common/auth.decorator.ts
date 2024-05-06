import {
  ExecutionContext,
  HttpException,
  createParamDecorator,
} from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const employee = request.employee;
    if (employee) {
      return employee;
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  },
);
