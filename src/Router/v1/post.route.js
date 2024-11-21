const { getAllPostsController } = require('../../controllar/post.controller');
const requireUser = require('../../Middleware/requireUser');

const router = require('express').Router();

router.get('/all', requireUser, getAllPostsController);

module.exports = router;