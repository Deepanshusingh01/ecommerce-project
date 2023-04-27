const cartController = require("../controller/cart.controller");
const {auth} = require("../middleware")
const router = require("express").Router()

router.post("/user/cart",auth.verifyToken,cartController.addCart);

module.exports = router;