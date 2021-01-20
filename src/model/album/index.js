import mongoose from'mongoose';
import schemaAlbum from './schemaAlbum.js';
import CreateModel from '../CreateModel.js';

const createModel = new CreateModel(
  'Album',
  schemaAlbum
);

export default createModel;
