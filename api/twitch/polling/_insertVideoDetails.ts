
const connectToDatabase = require('../../_connectToDatabase');

const insertVideoDetails = async (videos:any[]) => {
  const db = await connectToDatabase();

  // checks if video is in mongo, if not, add it and supply newVideos with details
  const newVideos = videos.map(async video => {
    const res = await db.collection('downloadedVods').findOne({id: video.id})
    if(!res) {
      // insert to mongo
      await db.collection('downloadedVods').insertOne(video);
      return(video);
    }
  });

  // newVideos still contains null elements from videos that have entries in mongo so remove them
  const videosToQueue = (await Promise.all(newVideos)).filter(videoDetails => {
    return videoDetails != null;
  });

  // return list of videos that should be added to queue
  return(videosToQueue);
}

module.exports = insertVideoDetails;
