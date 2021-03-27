const connectToDatabase = require('../../_connectToDatabase');

const insertVideoDetails = async (videos:any[]) => {
  try{
    const listOfIds = videos.map(video => {
      return video.id;
    })
    let videosToInsert = videos;

    const db = await connectToDatabase();
    const existingVods = await db.collection('downloadedVods').find({ id: { $in: listOfIds } }).toArray();

    // splice existing videos from full list to just get videos we want to insert to Mongo
    existingVods.forEach(vod => {
      videosToInsert.splice(videosToInsert.findIndex(item => item.id === vod.id), 1)
    });

    let videosToQueue;
    if(videosToInsert.length > 0) {
      const insertResponse = await db.collection('downloadedVods').insertMany(videosToInsert);
      videosToQueue = insertResponse.ops;
    }
    else {
      videosToQueue = [];
    }
    return(videosToQueue);
  }
  catch (e) {
    console.error(e);
    return(e);
  }
}

export default insertVideoDetails;
