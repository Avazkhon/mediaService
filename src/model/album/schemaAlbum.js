import mongoose from'mongoose';
import mongodb from'mongodb';
import moment from'moment-timezone';

const Schema = mongoose.Schema;
const album = new Schema(
  {
    name: { type: String, default: 'main' },
    createDate: { type: Date, default: moment().utc().format() },
    images: [{ type: String, required: true }]
  },
  { strict: true }
);

export default new Schema(
  {
    userId: { type: mongodb.ObjectID, required: true },
    createDate: { type: Date, default: moment().utc().format() },
    albums: [album]
  },
  { collection: 'Album', strict: true }
);
