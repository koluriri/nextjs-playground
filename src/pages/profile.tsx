import fetcher, { APIReturnData } from 'utils/fetcher';

import useSWR from 'swr';
import styles from 'styles/Home.module.css';
import axios from 'axios';
import { useEffect } from 'react';

const Profile = () => {
  const { data, error } = useSWR<APIReturnData, Error>(`/api/hello`, fetcher);

  useEffect(() => {
    axios
      .post('/api/hello')
      .then((response) => {
        console.log(response.data);
      })
      .catch(() => {
        alert('error');
      });
  }, []);

  if (!error && !data) return <h2>Loading....</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div className={styles.container}>
      <h2>{!!data && data.name}</h2>
    </div>
  );
};

export default Profile;
