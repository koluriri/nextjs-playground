import { useEffect, useState } from 'react';

const Profile = () => {
  const [data, setData] = useState<{ name: string } | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/hello')
      .then((res) => res.json())
      // eslint-disable-next-line no-shadow
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        alert('error');
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
};

export default Profile;
