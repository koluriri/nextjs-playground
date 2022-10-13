import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import app from 'utils/firebase';

export type UserType = User | null;

export type AuthContextProps = {
  user: UserType;
};

export type AuthProps = {
  children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextProps>>({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState<UserType>(null);
  const isAvailableForViewing =
    router.pathname === '/about' ||
    router.pathname === '/signin' ||
    router.pathname === '/signup';
  const value = useMemo(
    () => ({
      user,
    }),
    [user],
  );

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser && !isAvailableForViewing)
        router.push('/signin').catch(() => alert('error: router push failed'));
    });

    return () => {
      authStateChanged();
    };
  }, [auth, isAvailableForViewing, router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
