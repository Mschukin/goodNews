const {
  getAllPostsController,
  getFilteredPostsController,
} = require('../controllers/PostController')

const router = require('express').Router()
const verifyRefreshToken = require('../middleware/verifyRefreshToken')

router.get('/', getAllPostsController)
router.post('/filtered', getFilteredPostsController)

module.exports = router

