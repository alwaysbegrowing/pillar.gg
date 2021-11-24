// refresh the twitch authentication if there
// was a failed request. Returns true if successful.
export const refresh = async () => {
  // get the refresh token from local storage
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    return false;
  }

  const resp = await fetch(`/api/user/refresh?token=${refresh_token}`);

  if (!resp.ok) {
    return false;
  }

  const data = await resp.json();

  const { access_token, refresh_token: new_refresh_token } = data;

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', new_refresh_token);

  return true;
};
