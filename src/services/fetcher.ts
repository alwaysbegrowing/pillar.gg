import { notification } from 'antd';
import { history } from 'umi';
import type { ResponseError } from 'umi-request';
import request from 'umi-request';

const twitchClientId = 'phpnjz4llxez4zpw3iurfthoi573c8';

const codeMessage = {
  200: 'The server successfully returned the requested data. ',
  201: 'Create or modify data successfully. ',
  202: 'A request has entered the background queue (asynchronous task). ',
  204: 'Delete data successfully. ',
  400: 'The request sent has an error, and the server has not performed any new or modified data operations. ',
  401: 'The user does not have permission (the token, username, password are wrong). ',
  403: 'The user is authorized, but access is forbidden. ',
  404: 'The request sent was for a record that did not exist, and the server did not operate. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource has been permanently deleted and will no longer be available. ',
  422: 'When creating an object, a validation error occurred. ',
  500: 'An error occurred in the server, please check the server. ',
  502: 'Gateway error. ',
  503: 'Service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'The gateway has timed out. ',
};

/**
 * Exception handler
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status && response.status !== 404) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status} : ${url} `,
      description: errorText,
    });
    if (status === 401 || status === 403) {
      localStorage.removeItem('access_token');
      history.push('/');
    }
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and you cannot connect to the server',
      message: 'Network abnormal',
    });
  }

  throw error;
};

// const extendRequest = extend({ errorHandler });

const fetcher = (url: string) => {
  // const accessToken = localStorage.getItem('access_token');
  // if (!accessToken) return null;

  // const headers = {
    // Authorization: `Bearer ${accessToken}`,
    // 'Client-ID': twitchClientId,
  // };

  return request(url)
    .then((res: any) => res)
    .catch(errorHandler);
};
export { fetcher };
