import * as yup from 'yup';
import type { InferType } from 'yup';

export const regFormSchema = yup.object({
  email: yup
    .string()
    .email('メールアドレスを入力しなさい')
    .required('必須ですよ'),
  password: yup
    .string()
    .required('必須ですよ')
    .matches(/^[A-Za-z0-9]+$/, '英数字で入力しなさい'),
  isAgreed: yup
    .boolean()
    .oneOf([true], '同意が必要です')
    .required('必須ですよ'),
});

export type RegFormSchema = InferType<typeof regFormSchema>;
