import type { VercelRequest, VercelResponse } from '@vercel/node';
import refreshTwitchCredentials from '../twitch/_refreshTwitchAuth';

const refreshToken = async (req: VercelRequest, res: VercelResponse) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({ error: 'No token received' });
  }

  const credentials = await refreshTwitchCredentials(token);

  return res.json(credentials);
};

export default refreshToken;
