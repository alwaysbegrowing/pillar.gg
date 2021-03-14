/**
 *
 * @param channel_id
 * @param timestamp
 * https://dev.twitch.tv/docs/api/reference#get-videos
 */
const sendNewVodToQueue = async (channel_id:string, timestamp:string) => {
  const url = `https://api.twitch.tv/helix/videos?user_id=${channel_id}`;
    const clientId = process.env.TWITCH_CLIENT_ID;
    const appToken = await getAppToken();

    const data = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${appToken}`,
        'Client-ID': clientId,
      },
      body: JSON.stringify({
        "type": "archive"
      })
    })
    .then(response => response.json())
    .catch(err => {
      console.log(err);
    })
};

module.exports = sendNewVodToQueue;
