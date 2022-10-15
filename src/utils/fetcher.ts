import axios, { AxiosError } from 'axios';
import { apiReturnSchema } from './api-return-schema';

type Literal = boolean | null | number | string;
export type Json = Literal | { [key: string]: Json } | Json[];

const fetcher = async (url: string): Promise<any> =>
  axios
    .get(url)
    .then((response: { data: Json }) => {
      if (apiReturnSchema.safeParse(response.data).success)
        return response.data;

      return Error;
    })
    .catch((response: AxiosError) => {
      const error = new Error(response.message);
      console.log(response);
      throw error;
    });

export default fetcher;
