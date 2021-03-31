const connectToDatabase = require('../_connectToDatabase');

const addUser = async (email_in: string, twitch_id_in: string) => {
  const db = await connectToDatabase();

  // add user
  const myobj = {
    email: email_in,
    twitch_id: twitch_id_in,
    isMonitoring: true,
  };

  db.collection('users').insertOne(myobj);
};

module.exports = addUser;
