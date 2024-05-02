import { ZodType, z } from 'zod';

export class TodoSchema {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(100),
    categaory_name: z.string().min(1).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(100),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
