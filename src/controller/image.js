import minioClient from '../minioClient.js';

const imageUpload = (req, res) => {
  try {
    const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }

    minioClient.putObject('europetrip', req.files.avatar.name, req.files.avatar.data, metaData,  function(err, etag) {
      if (err) return res.status(500).json({error: err.toString()})
      res.status(200).json({ message: 'File uploaded successfully'})
    });
  } catch (error) {
    return res.status(500).json({error: error.toString()})
  }
}


const getImage = (req, res) => {
  const {
    params
  } = req;

  let image;
  minioClient.getObject('europetrip', params.id, (err, dataStream) => {
    if (err) {
      return res.status(500).json({error: err.toString()})
    }

    dataStream.on('data', (chunk) => {
        image = !image ? new Buffer.from(chunk) : Buffer.concat([image, chunk])
    })

    dataStream.on('end', () => {
      res.write(image);
      res.end();
    })
    dataStream.on('error', (error) => {
      res.status(500).json({ error: error.toString() })
    })
  })
}

export default {
  imageUpload,
  getImage
}
