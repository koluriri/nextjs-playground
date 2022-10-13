import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import app from 'utils/firebase';
import useSWR from 'swr';

export type UserType = User | null;

export const useAuth = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const { mutate: setUser } = useSWR<UserType>('user', null, {});
  const isAvailableForViewing =
    router.pathname === '/signin' || router.pathname === '/signup';

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)
        .then(async () => {
          if (!authUser && !isAvailableForViewing) await router.push('/signin');
        })
        .catch(() => alert('Error!'));
    });

    return () => {
      authStateChanged();
    };
  }, [auth, isAvailableForViewing, router, setUser]);
};
