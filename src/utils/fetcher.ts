import axios, { AxiosError } from 'axios';

export type APIReturnData = {
  name: string;
};

const isAPIReturnData = (data: any): data is APIReturnData =>
  data !== null &&
  'name' in data &&
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof data?.name === 'string';

const fetcher = async (url: string): Promise<APIReturnData> =>
  axios
    .get(url)
    .then((response) => {
      if (isAPIReturnData(response.data)) return response.data;

      return Error;
    })
    .catch((response: AxiosError) => {
      const error = new Error(response.message);
      console.log(response);
      throw error;
    });

export default fetcher;
