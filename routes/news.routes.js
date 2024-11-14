const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/search', postController.searchPost);

module.exports = router;