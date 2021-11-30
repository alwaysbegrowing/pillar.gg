import { login, refreshToken } from '../auth';

const swrErrorRetry = (error, key, config, revalidate, { retryCount }) => {
  // Never retry on 404.
  if (error.status === 404) return;

  // Never retry on network errors.
  if (error.isNetworkError) return;

  // Only retry once.
  if (retryCount >= 1) {
    login();
    setTimeout(() => revalidate({ retryCount }), 5000);
    return;
  }

  // attempt to refresh the token
  refreshToken();

  // Retry after 5 seconds.
  setTimeout(() => revalidate({ retryCount }), 5000);
};

export default swrErrorRetry;
