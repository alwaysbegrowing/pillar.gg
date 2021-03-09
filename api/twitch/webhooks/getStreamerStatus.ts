import { NowRequest, NowResponse } from '@vercel/node';
const fetch = require('node-fetch');

const getStreamerStatus = async (req: NowRequest, res: NowResponse) => {
        res.status(200).json({"msg": "success"});
};

module.exports = getStreamerStatus;