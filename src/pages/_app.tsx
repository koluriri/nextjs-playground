import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'layout/layout';
import { AuthProvider } from 'utils/authcontext';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
);

export default MyApp;
