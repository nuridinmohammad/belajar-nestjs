import { z, ZodType } from 'zod';

export class ProjectSchema {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    name: z.string().min(1).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
