import mongoDb from 'mongodb';
import mongoose from 'mongoose';

import passwords from '../password.js';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,

  poolSize: 10, // Maintain up to 10 socket connection
};

const NODE_ENV = process.env.NODE_ENV || 'development';
const nameDB = (NODE_ENV === 'production') ? 'album' : 'albumDev'
const uri = `mongodb+srv://${passwords.nameAndPasswordMongoDB}@cluster0-rzc7k.mongodb.net/${nameDB}?retryWrites=true&w=majority`;
mongoose.set('useFindAndModify', false);
async function connect(done) {
  await mongoose.connect(uri, options)
  .then(() => {
      var db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      done();
  })
  .catch((e) => {
    console.log(e);
  });
}

export default {
  connect
};
