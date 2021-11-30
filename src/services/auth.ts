import { twitchClientId } from '@/services/fetcher';

export const redirectURI = `${window.location.origin}/TwitchAuth`;

export const login = () => {
  window.open(
    `https://id.twitch.tv/oauth2/authorize?client_id=${twitchClientId}&redirect_uri=${redirectURI}&response_type=code&scope=user_read%20moderation:read`,
    '_blank',
    'popup, left=100,top=100,width=320,height=320',
  );
};

// refresh the twitch authentication if there
// was a failed request. Returns true if successful.
export const refreshToken = async () => {
  // get the refresh token from local storage
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    return false;
  }

  const resp = await fetch(`/api/user/refreshToken?token=${refresh_token}`);

  if (!resp.ok) {
    return false;
  }

  const data = await resp.json();

  const { access_token, refresh_token: new_refresh_token } = data;

  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', new_refresh_token);

  return true;
};

export const logoutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  // refresh the page
  window.location.reload();
};
