import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from './prisma.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      employee?: object;
    }
  }
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] as string;
    if (token) {
      const employee = await this.prismaService.employee.findFirst({
        where: {
          token: token,
        },
      });

      if (employee) {
        req.employee = employee;
      }
    }
    next();
  }
}
