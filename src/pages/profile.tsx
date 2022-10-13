import fetcher, { APIReturnData } from 'utils/fetcher';

import useSWR from 'swr';
import styles from 'styles/Home.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import app from '~/utils/firebase';
import { getAuth } from 'firebase/auth';

const Profile = () => {
  const { data, error } = useSWR<APIReturnData, Error>(`/api/hello`, fetcher);

  const auth = getAuth(app);

  useEffect(() => {
    if (auth.currentUser)
      auth.currentUser
        .getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          axios
            .put(`/api/hello`, {
              token: idToken,
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch(() => {
              alert('error');
            });
        })
        .catch((postError) => {
          console.error(postError);
          alert('ERROR!');
        });
  }, [auth.currentUser]);

  if (!error && !data) return <h2>Loading....</h2>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <div className={styles.container}>
      <h2>{!!data && data.name}</h2>
    </div>
  );
};

export default Profile;
