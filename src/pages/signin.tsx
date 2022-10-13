import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from 'utils/firebase';
import useSWR from 'swr';
import { UserType } from '~/hooks/use-auth';

const SignIn = () => {
  const router = useRouter();
  const { data: user } = useSWR<UserType>('user', null);
  const auth = getAuth(app);
  const isLoggedIn = !!user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) router.push('/').catch(() => alert('ログインしています'));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        await router.push('/');
      })
      .catch(() => alert('error'));
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div>
      <h2>ログイン</h2>
      {isLoggedIn && <p>ログインしています</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            メールアドレス
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChangeEmail}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            パスワード
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChangePassword}
            />
          </label>
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
        <div>
          <Link href="/signup">登録はこちら</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
