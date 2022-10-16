import axios, { AxiosError } from 'axios';
import app from '~/utils/firebase';
import { getAuth } from 'firebase/auth';
import { apiReturnSchema } from './api-return-schema';

type Literal = boolean | null | number | string;
export type Json = Literal | { [key: string]: Json } | Json[];
const auth = getAuth(app);

const fetcher = async (url: string): Promise<any> => {
  if (auth.currentUser) {
    return auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) =>
        axios
          .get(`${url}`, { headers: { Authorization: idToken } })
          .then((response: { data: Json }) => {
            if (apiReturnSchema.safeParse(response.data).success)
              return response.data;

            return Error;
          })
          .catch((response: AxiosError) => {
            const error = new Error(response.message);
            console.log(response);
            throw error;
          }),
      )
      .catch((postError) => {
        console.error(postError);
        alert('ERROR!');
      });
  }
  console.error('not user');
  alert('ERROR!');
  throw Error('not user');
};

export default fetcher;
