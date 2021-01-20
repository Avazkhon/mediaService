import modelAlbum from '../model/album/index.js';

export default {
  getAlums
}

function getAlums (req, res) {
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
