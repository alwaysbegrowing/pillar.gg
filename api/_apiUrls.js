const mobileExport = 'https://lfh9xm104e.execute-api.us-east-1.amazonaws.com/prod/export';

const mobileExportDev = 'https://2tbsk29ja7.execute-api.us-east-1.amazonaws.com/prod/export';

const clipExport = 'https://lfh9xm104e.execute-api.us-east-1.amazonaws.com/prod/clips';

const clipExportDev = 'https://2tbsk29ja7.execute-api.us-east-1.amazonaws.com/prod/clips';

const { NODE_ENV } = process.env;

export const CLIP_EXPORT_URL = NODE_ENV === 'development' ? clipExportDev : clipExport;

export const MOBILE_EXPORT_URL = NODE_ENV === 'development' ? mobileExportDev : mobileExport;
