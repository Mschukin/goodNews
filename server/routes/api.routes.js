const router = require('express').Router()
const apiRouter = require('./api.routes')
const apiAuthRegRouter = require('./api.auth.reg.routes')
const apiPostsRouter = require('./api.post.routes')

router.use('/auth', apiAuthRegRouter)
router.use('/posts', apiPostsRouter)

module.exports = router