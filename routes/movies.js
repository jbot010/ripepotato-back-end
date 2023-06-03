const router = require('express').Router()
const moviesCtrl = require('../controllers/movies.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, moviesCtrl.createMovie)


module.exports = router