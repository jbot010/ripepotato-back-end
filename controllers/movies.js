const { Movie } = require('../models')

async function createMovie(req, res) {
  try {
    req.body.createdById = req.user.profile.id
    const movie = await Movie.create(req.body)
    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}

module.exports = {
  createMovie
}