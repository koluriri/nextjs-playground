import { ReactElement } from 'react';
import Link from 'next/link';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => (
  <>
    <nav>
      <Link href="/">home</Link>
    </nav>
    <main>{children}</main>
  </>
);

export default Layout;
