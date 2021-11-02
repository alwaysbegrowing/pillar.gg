import useSWR from 'swr';
import { fetcher } from '../fetcher';

const useExport = (id: string) => {
  const { data, error } = useSWR(`/api/export/get/video/${id}`, fetcher);
  return { data, isLoading: !error && !data, isError: error };
};

const useExports = (page: number, perPage: number = 10, userId: string | number | null = null) => {
  const userIdString = userId ? `&userId=${userId}` : '';
  const { data, error } = useSWR(
    `/api/export/get/all?page=${page}&perPage=${perPage}${userIdString}`,
    fetcher,
  );
  return { data, isLoading: !error && !data, isError: error };
};

export { useExport, useExports };
