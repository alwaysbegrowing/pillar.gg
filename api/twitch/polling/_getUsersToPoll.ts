/**
 * This function queries the users collection in MongoDB for accounts that should have their VODs downloaded.
 * @return string array of the twitch_ids of Pillar users who have the isMonitoring flag set to true
 */

 const connectToDatabase = require('../../_connectToDatabase');

 const getUsersToPoll = async () => {
   try {
     const db = await connectToDatabase();
     const usersToMonitor = await db
       .collection('users')
       .find({
         isMonitoring: true
       })
       .project({ "twitch_id": 1, _id: 0 })
       .toArray();
     const listOfIds: [string] = usersToMonitor.map(({ twitch_id }: any) => twitch_id);
     return(listOfIds);
   }
   // TODO: Add better error handling
   catch(e: any) {
     console.error(e);
     return([]);
   }
 };

export default getUsersToPoll;
