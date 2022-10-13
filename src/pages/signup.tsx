import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from 'utils/firebase';
// import { useAuthContext } from '../src/context/AuthContext';

const Signup = () => {
  const router = useRouter();
  // const { user } = useAuthContext();
  const auth = getAuth(app);
  // const isLoggedIn = !!user;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
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
      <h2>ユーザー登録</h2>
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
          <Link href="/signin">すでに登録している人はこちら</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
