import * as z from 'zod';

export const apiReturnSchema = z.object({
  name: z.string().optional(),
  message: z.string().optional(),
});

export type ApiReturnSchema = z.infer<typeof apiReturnSchema>;
