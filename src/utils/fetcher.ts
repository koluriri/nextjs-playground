import axios, { AxiosError } from 'axios';
import { Data } from 'pages/api/hello';

const isAPIReturnData = (data: { [key: string]: any }): data is Data =>
  !!data &&
  data !== null &&
  typeof data === 'object' &&
  typeof data?.name === 'string';

const fetcher = async (url: string): Promise<any> =>
  axios
    .get(url)
    .then((response: { data: { [key: string]: any } }) => {
      if (isAPIReturnData(response.data)) return response.data;

      return Error;
    })
    .catch((response: AxiosError) => {
      const error = new Error(response.message);
      console.log(response);
      throw error;
    });

export default fetcher;
