const router = require('express').Router()
const apiRouter = require('./api.routes')
const apiAuthRegRouter = require('./api.auth.reg.routes')
const apiPostsRouter = require('./api.post.routes')
const postController1 = require('../controllers/postController1')


router.use('/auth', apiAuthRegRouter)
router.use('/posts', apiPostsRouter)
router.post('/search', postController1.searchPost)
module.exports = router