const {
    signupController,
    loginController,
    refreshAccessTokenController,
} = require('../../controllar/auth.controller');
// const requireUser = require('../../Middleware/requireUser');

const router = require('express').Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/refreshtoken',  refreshAccessTokenController);

module.exports = router;
