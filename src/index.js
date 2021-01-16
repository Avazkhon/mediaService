import express from 'express';

import image from './controller/image.js';

import db from './db.js';


const app = express();

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
