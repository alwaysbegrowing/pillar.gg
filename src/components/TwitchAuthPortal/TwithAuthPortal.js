import { useEffect } from 'react';

export default function TwitchAuthPortal() {
  useEffect(() => {
    const clientID = '2nakqoqdxka9v5oekyo6742bmnxt2o';
    const redirectURI = 'http://localhost:8000/TwitchAuth';
    window.open(`https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token&scope=user_read`, "Login to Twitch", "width=600px, height=400px, left=200px, top=200px")
  });
  return null;
}
