import fetcher from 'utils/fetcher';

import useSWR from 'swr';
import styles from 'styles/Home.module.css';
import axios from 'axios';
import { useEffect } from 'react';
import app from '~/utils/firebase';
import { getAuth } from 'firebase/auth';
import { ApiReturnSchema } from '~/utils/api-return-schema';

const Profile = () => {
  const { data, error } = useSWR<ApiReturnSchema, Error>(`/api/test`, fetcher);

  const auth = getAuth(app);

  useEffect(() => {
    if (auth.currentUser)
      auth.currentUser
        .getIdToken(/* forceRefresh */ true)
        .then((idToken) => {
          axios
            .post(`/api/hello`, {
              token: idToken,
              email: 'aaa@aaa.aaa',
              password: 'aaaa',
              isAgreed: true,
            })
            .then((response: { data: ApiReturnSchema }) => {
              console.log(response.data);
              if (response.data.name) alert(`${response.data.name}`);
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
