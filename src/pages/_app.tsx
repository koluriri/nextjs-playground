import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'layout/layout';
import { useAuth } from '~/hooks/use-auth';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useAuth();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
