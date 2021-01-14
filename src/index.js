import express from 'express';
import Minio from 'minio';


const app = express();

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'khan',
  serretKey: '0125699khan',
})
console.log(minioClient);

app.route('/')
  .get((req, res) => {
    res.send('Hello, i m media service!')
  })


app.listen(8082, () => {
  console.log('media service started!');
})
