const { signupController, loginController } = require('../../controllar/auth.controller');


const router = require ('express').Router();


router.post('/signup', signupController);
router.post('/login', loginController)

module.exports = router;