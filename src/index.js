import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import Minio from 'minio';


const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  useTempFiles: true,
}));

const minioClient = new Minio.Client({
  endPoint: '172.17.0.1',
  port: 9000,
  useSSL: false,
  accessKey: 'khan',
  secretKey: 'adminKhan',
});

app.route('/fileUpload')
  .post((req, res) => {
    try {
      const metaData = {
          'Content-Type': 'application/octet-stream',
          'X-Amz-Meta-Testing': 1234,
          'example': 5678
      }
      console.log(req.files.avatar.data);
      minioClient.putObject('europetrip', req.files.avatar.name, req.files.avatar.data, metaData,  function(err, etag) {
        if (err) return res.status(500).json({error: err.toString()})
        res.status(200).json({ message: 'File uploaded successfully'})
      });
    } catch (error) {
      return res.status(500).json({error: error.toString()})
    }
  })


app.listen(8082, () => {
  console.log('media service started!');
})
