const router = require('express').Router()
const apiAuthRegRouter = require('./api.auth.reg.routes')
const apiPostsRouter = require('./api.post.routes')
//const postController1 = require('../controllers/postController1')


router.use('/auth', apiAuthRegRouter)
router.use('/posts', apiPostsRouter)
//router.post('/posts', postController1.searchPost)
module.exports = router