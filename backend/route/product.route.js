const productController = require("../controller/product.controller");


module.exports = (app) =>{
    app.post("/user/product",productController.addProduct)
}