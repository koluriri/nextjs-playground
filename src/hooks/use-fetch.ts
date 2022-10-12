/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR from 'swr';
import fetcher, { APIReturnData } from 'utils/fetcher';

export const useFetch = () => {
  const { data, error } = useSWR<APIReturnData, Error>(`/api/hello`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
