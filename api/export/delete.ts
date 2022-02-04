import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch, { Headers } from 'node-fetch';
import getTwitchUserData from '../../twitch/_getTwitchUserData';

const connectToDatabase = require('../../_connectToDatabase');

const deleteVod = async (req: VercelRequest, res: VercelResponse) => {
  
};

export default deleteVod;
