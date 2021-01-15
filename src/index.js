import express from 'express';

import image from './controller/image.js';


const app = express();

app.route('/fileUpload')
  .post(image.imageUpload)

app.get('/image/:id', image.getImage)


app.listen(8082, () => {
  console.log('media service started!');
})
