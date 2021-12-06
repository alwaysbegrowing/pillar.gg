import { refreshToken } from '../auth';

const INTERVAL = 500;

const swrErrorRetry = (error, key, config, revalidate, { retryCount }) => {
  // if the status code is 401, refresh the token and retry
  if (error.status === 401) {
    // attempt to refresh the token
    refreshToken().finally(() => {
      revalidate({ retryCount });
    });
  } else {
    // exponential backoff
    // from https://git.io/JMpLA
    const timeout =
      ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * INTERVAL;

    // otherwise wait and try to revalidate the cache
    setTimeout(() => {
      revalidate({ retryCount });
    }, timeout);
  }
};

export default swrErrorRetry;
