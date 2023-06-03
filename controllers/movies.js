const { Movie } = require('../models')

async function createMovie(req, res) {
  try {
    req.body.createdById = req.user.profile.id
    const movie = await Movie.create(req.body)
    res.status(200).json(movie)
  } catch (error) {
    console.log(error)    
    res.status(500).json({ err: error })
  }
}

async function index(req, res) {
  try {
    const movies = await Movie.findAll({})
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })    
  }
}

async function update(req, res) {
  try {
    const movie = await Movie.update(
      req.body,
      { where: { id: req.params.movieId }, returning: true }
    )
    res.status(200).json(movie)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.movieId)
    await movie.destroy()
    res.status(200).json(movie)
  } catch (error) {
    console.log(error)
    res.status(500).json({ err: error })
  }
}



module.exports = {
  createMovie,
  index,
  update,
  delete: deleteMovie,
}