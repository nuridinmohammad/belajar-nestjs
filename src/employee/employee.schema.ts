import { z, ZodType } from 'zod';

export class EmployeeSchema {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    fullname: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    fullname: z.string().min(1).max(100).optional(),
    password: z.string().min(1).max(100).optional(),
    rate: z.string().min(1).max(100).optional(),
  });
}
