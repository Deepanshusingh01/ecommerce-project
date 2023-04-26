const cartController = require("../controller/cart.controller");
const {auth} = require("../middleware")

module.exports = (app) =>{

    app.post("/user/cart",[auth.verifyToken],cartController.addCart)
}