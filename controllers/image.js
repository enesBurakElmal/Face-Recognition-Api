const Clarifai = require('clarifai')

var _0xcf6f = [
  '\x32\x32\x32\x64\x36\x36\x34\x38\x33\x38\x32\x35\x34\x33\x30\x66\x61\x31\x66\x30\x32\x31\x63\x66\x63\x64\x33\x64\x32\x34\x33\x32',
]
const app = new Clarifai.App({ apiKey: _0xcf6f[0] })

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries)
    })
    .catch((err) => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall,
}
