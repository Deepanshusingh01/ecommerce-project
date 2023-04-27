const productController = require("../controller/product.controller");


module.exports = (app) =>{
    app.post("/user/product",productController.addProduct)
    app.get("/user/products",productController.allProducts);
    app.get("/user/product/:key",productController.searchProduct)
}