import modelAlbum from '../model/album/index.js';

export default {
  getAlbums,
  getAlbum
}

function getAlbums (req, res) {
  try {
    const {
      userId
    } = req.params;
    return modelAlbum.findOne({ userId })
      .then((albums) => {
        res.status(200).json(albums)
      })
      .catch((error) => {
        res.status(200).json({ error: toString() })
      })
  } catch (error) {
    res.status(200).json({ error: toString() })
  }
}

function getAlbum (req, res) {
  try {
    const {
      userId,
      albumId
    } = req.params;
    return modelAlbum.findOne({ userId })
      .then((albums) => {
        res.status(200).json(albums.albums.find((album) => album._id == albumId))
      })
      .catch((error) => {
        res.status(500).json({ error: toString() })
      })
  } catch (error) {
    res.status(500).json({ error: toString() })
  }
}
