const twitchClientId = '2nakqoqdxka9v5oekyo6742bmnxt2o';

const getTwitchUserData = async () => {
  const url = `https://api.twitch.tv/helix/users`;

  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) return null;

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
export { getTwitchUserData };
