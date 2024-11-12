const {
    signupController,
    loginController,
    refreshAccessTokenController,
} = require('../../controllar/auth.controller');
const requireUser = require('../../Middleware/m1');

const router = require('express').Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/refresh', requireUser, refreshAccessTokenController);

module.exports = router;
