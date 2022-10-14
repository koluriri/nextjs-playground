import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

interface Props {
  statusCode?: number;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) =>
  statusCode ? (
    <Error statusCode={statusCode} />
  ) : (
    <p>An error occurred on client</p>
  );

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default ErrorPage;
