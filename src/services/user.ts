const twitchClientId = '2nakqoqdxka9v5oekyo6742bmnxt2o';

const getTwitchUserData = async (accessToken: string) => {
  const url = `https://api.twitch.tv/helix/users`;

  try {
    const resp = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Client-ID': twitchClientId,
      },
    });
    const result = await resp.json();
    if (resp.ok) {
      const [userData] = result.data;
      return userData;
    }
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};
export async function queryCurrent() {
  console.log('gooo');
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    console.log('access token found');
    const resp = await getTwitchUserData(access_token);
    return resp.json();
  }
  return null;
}
