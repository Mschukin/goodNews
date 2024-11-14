const express = require('express');
const router = express.Router();
const postController1 = require('../controllers/postController1');



router.post('/search', postController1.searchPost);

module.exports = router;