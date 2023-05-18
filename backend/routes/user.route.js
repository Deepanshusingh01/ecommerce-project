const userController = require('../controllers/user.controller');
const router = require('express').Router();
const { auth, verifySession, validate } = require('../middleware');
const userValidation = require('../validation/userValidation')


router.post('/user/signup', validate(userValidation.registerUser), userController.signup);
router.post('/user/signin', validate(userValidation.login), userController.signin);
router.post('/user/forget-password', userController.forgetPassword);
router.post('/user/reset-password/:otp/:userId', userController.resetPasswordUsingOtp);
router.get('/users', userController.findAll);
router.get('/api/user/:id', userController.findById);
router.get('/api/user/:id', userController.updateUser);

router.use(verifySession)
router.post('/user/set-new-password', auth.verifyToken, userController.resetPassword);

module.exports = router;
