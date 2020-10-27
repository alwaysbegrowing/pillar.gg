import { useEffect } from 'react';

export default function YoutubeAuthPortal() {
  useEffect(() => {
    const clientID = '47075416327-4j0j5kmn9efc6un8qca6v5snqt21fj7d.apps.googleusercontent.com';

    // determine host and use correct redirect
    // const redirectURI =
    //   window.location.hostname === 'localhost'
    //     ? 'http://localhost:8000/YoutubeAuth'
    //     : 'https://dev.clipclock.stream/YoutubeAuth';

    const redirectURI = 'https://dev.clipclock.stream/YoutubeAuth';
    window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?` +
        `scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&` +
        `include_granted_scopes=true&` +
        `approval_prompt=force&` +
        `access_type=offline&` +
        `state=state_parameter_passthrough_value&` +
        `redirect_uri=${redirectURI}&` +
        `response_type=code&` +
        `client_id=${clientID}`,
      'Login to Youtube',
      'width=600px, height=400px, left=200px, top=200px',
    );
  });
  return null;
}
