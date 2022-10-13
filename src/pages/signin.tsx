import React, { SyntheticEvent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from 'utils/firebase';

import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
  isAgreed: boolean;
}

const SignIn = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const isLoggedIn = !!auth.currentUser;

  if (isLoggedIn) router.push('/').catch(() => alert('ログインしています'));

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      isAgreed: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async () => {
        await router.push('/');
      })
      .catch(() => alert('error'));
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
        <div>
          <label htmlFor="email">
            メールアドレス
            <input id="email" type="email" {...register('email')} />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            パスワード
            <input id="password" type="password" {...register('password')} />
          </label>
        </div>
        <div>
          <label htmlFor="isAgreed">
            <input id="isAgreed" type="checkbox" {...register('isAgreed')} />
            規約に同意する
          </label>
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
