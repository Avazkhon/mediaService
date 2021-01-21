import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import minioClient from '../minioClient.js';
import modelAlbum from '../model/album/index.js';

const imageUpload = (req, res) => {
  try {
    const metaData = {
        'Content-Type': 'application/octet-stream',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678
    }

const imageName = uuidv4() + ':' + req.files.image.name;
    minioClient.putObject('facebetting', imageName, req.files.image.data, metaData, async function(err, etag) {
      if (err) return res.status(500).json({error: err.toString()})
      const hasAlbums = await modelAlbum.findOne(
        { userId: req.cookies.userId },
      );
      if (hasAlbums) {
        modelAlbum.findOneAndUpdate(
          {
            userId: req.cookies.userId
          },
          {
            $push: {
              'albums.$[album].images': imageName
            }
          },
          {
            new: true,
            arrayFilters: [{ 'album._id': hasAlbums.albums[0]._id }]
          }
        )
      } else {
         modelAlbum.create(
          {
            userId: req.cookies.userId,
            albums: [{
              images: imageName
            }]
          }
        )
      }

      res.status(200).json({ message: 'File uploaded successfully', imageName })
    });
  } catch (error) {
    return res.status(500).json({error: error.toString()})
  }
}


const getImage = async (req, res) => {
  try {
    const {
      params,
      query: {
        resize = '',
      }
    } = req;

    let image;
    minioClient.getObject('facebetting', params.id, (err, dataStream) => {
      if (err) {
        return res.status(500).json({error: err.toString()})
      }

      dataStream.on('data', (chunk) => {
          image = !image ? new Buffer.from(chunk) : Buffer.concat([image, chunk])
      })

        var sizes = resize.split('x');
      dataStream.on('end', () => {
        sharp(image)
        .rotate()
        .resize(+sizes[0] || null, +sizes[1] || null)
        .toBuffer()
        .then((data) => {
          res.write(data);
          res.end();
         })
      });

      dataStream.on('error', (error) => {
        res.status(500).json({ error: error.toString() })
      })
    })
  } catch (error) {
    res.status(500).json({ error: error.toString() })
  }
}

const removeImage = (req, res) => {
  try {
    const {
      params,
    } = req;

    minioClient.removeObject('facebetting', params.id, function(err) {
      if (err) {
        return res.status(500).json({ error: err })
      }
      res.status(200).json({ error: 'Removed the object' })
    })


  } catch (error) {
    res.status(500).json({ error: error.toString()})
  }
}

export default {
  imageUpload,
  getImage,
  removeImage
}
