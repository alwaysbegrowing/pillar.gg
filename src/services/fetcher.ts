const twitchClientId = 'jmyfr3xqjeyjkvzmnbyiexsf5864c1';

const getHeaders = () => {
  const accessToken = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  return headers;
};

const fetcher = async (url: string) => {
  const headers = getHeaders();
  // careful!!! This may cause a CORS errror if Client-ID is not allowed by the server
  headers['Client-ID'] = twitchClientId;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();

  // .catch(errorHandler);
};
export { fetcher, getHeaders, twitchClientId };
