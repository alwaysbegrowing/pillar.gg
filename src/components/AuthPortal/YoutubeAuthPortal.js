import { useEffect } from 'react';

export default function YoutubeAuthPortal() {
  useEffect(() => {
    const clientID = '281280164372-c6locid4b35mq4oc8h54920uej754l39.apps.googleusercontent.com';

    const redirectURI = window.location.origin + '/YoutubeAuth'

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
