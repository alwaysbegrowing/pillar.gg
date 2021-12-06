import { login, refreshToken } from '../auth';

const swrErrorRetry = (error, key, config, revalidate, { retryCount }) => {
  // Only try to log them in via the window
  // only once
  if (retryCount === 1) {
    login();
    return;
  }

  // attempt to refresh the token
  refreshToken().finally(() => {
    setTimeout(() => {
      revalidate({ retryCount });
    }, 1000 * retryCount);
  });
};

export default swrErrorRetry;
