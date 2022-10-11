import { Suspense } from 'react';
import useSWR from 'swr';

interface Hello {
  name: string;
}

const getHello = async (): Promise<any> =>
  fetch(`http://localhost:3000/api/hello`).then((res) => res.json());

const Profile = () => {
  const { data: hello } = useSWR<Hello>('hello', () => getHello(), {
    suspense: true,
  });

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <h2>{!!hello && hello.name}</h2>
    </Suspense>
  );
};

export default Profile;
