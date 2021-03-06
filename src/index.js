import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';



import db from './db.js';

import image from './controller/image.js';
import albums from './controller/albums.js';

import passwords from '../password.js';

const app = express();
const MongoStore = mongoStore(session)

app.use((req, res, next) => {
  ['https://facebetting.ru', "http://localhost:3000"].map(domain => {
  res.header("Access-Control-Allow-Origin", domain);
});
  // res.header("Access-Control-Allow-Origin", "http://facebetting.ru");
  res.header('Access-Control-Allow-Methods', ['POST', 'PUT', 'PATCH', 'DELETE']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);

  res.header("Cache-Control", "max-age = 31536000");
  next();
});
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  useTempFiles: true,
}));
app.use(session({
  secret: passwords.secret,
  saveUninitialized: false,
  resave: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 1000 * 60 * 60 * 24 * 3
  }),
}));

app.route('/media/fileUpload')
  .post(image.imageUpload);

app.route('/media/image/:id')
  .get(image.getImage)
  .delete(image.removeImage);

app.get('/media/albums/:userId', albums.getAlbums);
app.get('/media/album/:userId/:albumId', albums.getAlbum);


db.connect((err) => {
  if (err) {
    console.log(err);
    return
  }
  app.listen(8082, () => {
    console.log('media service started!');
  })
});
