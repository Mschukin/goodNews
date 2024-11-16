const router = require('express').Router()
const apiAuthRegRouter = require('./api.auth.reg.routes')
const apiPostsRouter = require('./api.post.routes')
const postController1 = require('../controllers/postController1')
const verifyAccessToken = require('../middleware/varifyAccessToken')


router.use('/auth', apiAuthRegRouter)
router.use('/posts', apiPostsRouter)
router.post('/news', postController1.searchPost)
module.exports = router