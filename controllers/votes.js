const { Vote, Movie } = require('../models')

async function castVote(req, res) {
  try {
		req.body.voterId = req.user.profile.id

    const prevVote = await Vote.findOne({
      where: {
        voterId: req.body.voterId,
        movieId: req.body.movieId,
      }
    })

    if (prevVote) {
      prevVote.value = req.body.value
      await prevVote.save()
    } else {
      await Vote.create(req.body)
    }

    const movie = await Movie.findByPk(
      req.body.movieId,
      { include: [{ model: Vote, as: "votesReceived" }] }
    )

    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json({ err: error })
  }
}


module.exports = {
  castVote, 
}