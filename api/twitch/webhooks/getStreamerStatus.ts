import type { VercelRequest, VercelResponse } from '@vercel/node';

const fetch = require('node-fetch');

const getStreamerStatus = async (req: VercelRequest, res: VercelResponse) => {
        res.status(200).json({"msg": "success"});
};

module.exports = getStreamerStatus;