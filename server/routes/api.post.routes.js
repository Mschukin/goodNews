const {
  getAllPostsController,
  getFilteredPostsController,
  deletePostsController
} = require('../controllers/PostController')

const router = require('express').Router()
const verifyRefreshToken = require('../middleware/verifyRefreshToken')


router.get('/', getAllPostsController)
router.post('/filtered', getFilteredPostsController)
router.delete("/filtered/:id", verifyAccessToken, deletePostsController)


module.exports = router

