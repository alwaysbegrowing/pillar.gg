import { useEffect } from 'react';

export default function TwitchAuthPortal() {
  useEffect(() => {
    const clientID = '2nakqoqdxka9v5oekyo6742bmnxt2o';

    // determine host and use correct redirect
    const redirectURI = (window.location.hostname === "localhost") ? "http://localhost:8000/TwitchAuth" : 'https://dev.clipclock.stream/TwitchAuth';
    // const redirectURI = 'http://localhost:8000/TwitchAuth';
    window.open(
      `https://id.twitch.tv/oauth2/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=user_read`,
      'Login to Twitch',
      'width=600px, height=400px, left=200px, top=200px',
    );
  });
  return null;
}
