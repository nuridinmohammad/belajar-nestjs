import { ZodType, z } from 'zod';

export class ActivitySchema {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    start_date: z.string().min(1).max(100),
    end_date: z.string().min(1).max(100),
    start_time: z.string().min(1).max(100),
    end_time: z.string().min(1).max(100),
    employee_id: z.number().positive().optional(),
    project_id: z.number().positive().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    title: z.string().min(1).max(100),
    start_date: z.string().min(1).max(100),
    end_date: z.string().min(1).max(100),
    start_time: z.string().min(1).max(100),
    end_time: z.string().min(1).max(100),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    project: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
