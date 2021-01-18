import express from 'express';

import image from './controller/image.js';

import db from './db.js';
import useConf from './use.js';


const app = express();

app.use((req, res, next) => {
  ['https://facebetting.ru', "http://localhost:3000"].map(domain => {
  res.header("Access-Control-Allow-Origin", domain);
});
  // res.header("Access-Control-Allow-Origin", "http://facebetting.ru");
  res.header('Access-Control-Allow-Methods', ['POST', 'PUT', 'PATCH', 'DELETE']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.route('/media/fileUpload')
  .post(image.imageUpload);

app.route('/media/image/:id')
  .get(image.getImage)
  .delete(image.removeImage);


db.connect((err) => {
  if (err) {
    console.log(err);
    return
  }
  app.listen(8082, () => {
    console.log('media service started!');
  })
});
