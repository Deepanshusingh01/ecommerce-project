const userController = require("../controller/user.controller");
const {verifyUser} = require("../middleware")

module.exports = (app) =>{
    app.post("/user/signup",verifyUser.verifyUserSignup,userController.signup)
    app.post("/user/signin",userController.signin)
}