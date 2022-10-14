import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from 'utils/firebase';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { regFormSchema } from 'utils/schema';
import type { RegFormSchema } from 'utils/schema';
import { FirebaseError } from 'firebase/app';

const SignIn = () => {
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
    resolver: yupResolver(regFormSchema),
  });

  const onSubmit: SubmitHandler<RegFormSchema> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
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
      <h2>ログイン</h2>
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
          <button type="submit">ログイン</button>
        </div>
        <div>
          <Link href="/signup">登録はこちら</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
