import * as z from 'zod';

export const regFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: '入力は必須です' })
    .email('メールアドレスを入力しなさい'),
  password: z
    .string()
    .min(1, { message: '入力は必須です' })
    .regex(/^[A-Za-z0-9]+$/, '英数字で入力しなさい'),
  isAgreed: z
    .boolean()
    .refine(
      (value: boolean) => value === true,
      () => ({ message: `同意は必須です` }),
    )
    .default(false),
  token: z.string().optional(),
});

export type RegFormSchema = z.infer<typeof regFormSchema>;
