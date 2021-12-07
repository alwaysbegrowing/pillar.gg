import useSWR from 'swr';
import { fetcher } from '../fetcher';

export interface ExportsOptions {
  startDate?: number;
  endDate?: number;
  dateSort?: number;
  platform?: string;
  platformSort?: number;
}

const useExports = (
  page: number,
  perPage: number = 10,
  userId: string | number | null = null,
  options: ExportsOptions = {},
) => {
  const { startDate, endDate, dateSort, platform, platformSort } = options;
  const userIdString = userId ? `&userId=${userId}` : '';
  const startDateString = startDate ? `&startDate=${startDate}` : '';
  const endDateString = endDate ? `&endDate=${endDate}` : '';
  const dateSortString = dateSort ? `&dateSort=${dateSort}` : '';
  const platformString = platform ? `&platform=${platform}` : '';
  const platformSortString = platformSort ? `&platformSort=${platformSort}` : '';
  const { data, error } = useSWR(
    `/api/export/get/all?page=${page}&perPage=${perPage}${userIdString}${startDateString}${endDateString}${dateSortString}${platformString}${platformSortString}`,
    fetcher,
    { refreshInterval: 1000 },
  );
  return { data, isLoading: !error && !data, isError: error };
};

export { useExports };
