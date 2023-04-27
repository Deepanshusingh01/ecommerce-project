const userController = require("../controller/user.controller");
const router = require("express").Router()
const {verifyUser} = require("../middleware")

router.post("/user/signup",verifyUser.verifyUserSignup,userController.signup);
router.post("/user/signin",userController.signin);
router.get("/users",userController.findAll);
router.get("/user/:id",userController.findById);
router.get("/user/:id",userController.updateUser);

module.exports = router
