import fetch from 'node-fetch';

const refreshTwitchCredentials = async (refresh_token) => {
  const params = new URLSearchParams();
  params.set('refresh_token', refresh_token);
  params.set('client_id', process.env.TWITCH_CLIENT_ID);
  params.set('client_secret', process.env.TWITCH_CLIENT_SECRET);
  params.set('grant_type', 'refresh_token');
  const url = `https://id.twitch.tv/oauth2/token?${params.toString()}`;

  const data = await fetch(url, {
    method: 'POST',
  });

  return data.json();
};

export default refreshTwitchCredentials;
