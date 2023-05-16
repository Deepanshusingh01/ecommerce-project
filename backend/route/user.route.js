const userController = require('../controller/user.controller');
const router = require('express').Router()
const {verifyUser,auth,verifySession} = require('../middleware')

// router.post('/user/signup',verifyUser.verifyUserSignup,userController.signup);
router.post('/user/signup',userController.signup);
router.post('/user/signin',userController.signin);
router.post('/user/forget-password',userController.forgetPassword);
router.post('/user/reset-password/:otp/:userId',userController.resetPasswordUsingOtp)
router.get('/users',userController.findAll);
router.get('/api/user/:id',userController.findById);
router.get('/api/user/:id',userController.updateUser);
// router.use(verifySession)
router.post('/user/set-new-password',auth.verifyToken,userController.resetPassword)


module.exports = router
