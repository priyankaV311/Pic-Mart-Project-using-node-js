const { getAllPostsController } = require('../../controllar/post.controller');
const requireUser = require('../../Middleware/m1');

const router = require('express').Router();

router.post('/', requireUser, getAllPostsController);

module.exports = router;