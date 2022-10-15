import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from 'utils/firebase';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { regFormSchema } from 'utils/schema-zod';
import type { RegFormSchema } from 'utils/schema-zod';
import { FirebaseError } from 'firebase/app';

const SignUp = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!auth.currentUser;

  if (isLoggedIn) router.push('/').catch(() => alert('ログインしています'));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegFormSchema>({
    defaultValues: {
      email: '',
      password: '',
      isAgreed: false,
    },
    resolver: zodResolver(regFormSchema),
  });

  const onSubmit: SubmitHandler<RegFormSchema> = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        await router.push('/');
      })
      .catch((error: FirebaseError) => console.log(error.code));
  };
  const onReset = (e: SyntheticEvent) => {
    e.stopPropagation();
    reset();
  };

  return (
    <div>
      <h2>登録</h2>
      {isLoggedIn && <p>ログインしています</p>}
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <div className={errors.email !== undefined ? 'error' : ''}>
          <label htmlFor="email">
            メールアドレス
            <input id="email" type="text" {...register('email')} />
          </label>
          <p>{errors.email?.message}</p>
        </div>
        <div className={errors.password !== undefined ? 'error' : ''}>
          <label htmlFor="password">
            パスワード
            <input id="password" type="password" {...register('password')} />
          </label>
          <p>{errors.password?.message}</p>
        </div>
        <div className={errors.isAgreed !== undefined ? 'error' : ''}>
          <label htmlFor="isAgreed">
            <input id="isAgreed" type="checkbox" {...register('isAgreed')} />
            規約に同意する
          </label>
          <p>{errors.isAgreed?.message}</p>
        </div>
        <div>
          <button type="button" onClick={onReset}>
            リセット
          </button>
          <button type="submit">登録</button>
        </div>
        <div>
          <Link href="/signin">ログインはこちら</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
