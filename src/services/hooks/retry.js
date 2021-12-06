import { login, refreshToken } from '../auth';

const swrErrorRetry = (error, key, config, revalidate, { retryCount }) => {
  // if the status code is 401, refresh the token and retry
  if (error.status === 401) {
    // only open the login modal once
    if (retryCount === 2) {
      login();
      return;
    }
    // attempt to refresh the token
    refreshToken().finally(() => {
      revalidate({ retryCount });
    });
  } else {
    // otherwise wait and try to revalidate the cache
    setTimeout(() => {
      revalidate({ retryCount });
    }, 500 * retryCount);
  }
};

export default swrErrorRetry;
