const userController = require('../controllers/user.controller');
const router = require('express').Router();
const { verifyToken, verifySession, refreshToken, validate } = require('../middleware');
const userValidation = require('../validation/userValidation')


router.post('/user/signup', userValidation.registerUser, validate, userController.signup);
router.post('/user/signin', userValidation.login, validate, userController.signin);
router.post('/user/forget-password', userController.forgetPassword);
router.post('/user/reset-password/:otp/:userId', userController.resetPasswordUsingOtp);
router.get('/users', userController.findAll);
router.get('/user/:id', userController.findById);
router.get('/user/:id', userController.updateUser);
router.get('/refresh_token', refreshToken, userController.refreshToken)

router.use(verifySession)
router.post('/user/set-new-password', verifyToken, userController.resetPassword);

module.exports = router;
