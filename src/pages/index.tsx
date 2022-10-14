import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Home.module.css';
import app from 'utils/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const handleLogout = () => {
    signOut(auth)
      .then(async () => {
        await router.push('/signin');
      })
      .catch(() => alert('ログアウトできません'));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello World! <Link href="/two/">two</Link>{' '}
          <Link href="/profile/">Profile</Link>
        </h1>
        <p>こんにちははじめてのNext.js</p>
        <p>
          <Link href="/signup">登録</Link>
          <Link href="/signin">ログイン</Link>
          <button onClick={handleLogout} type="button">
            ログアウト
          </button>
        </p>
      </main>
    </div>
  );
};

export default Home;
