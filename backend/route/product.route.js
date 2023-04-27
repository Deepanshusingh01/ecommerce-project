const productController = require("../controller/product.controller");
const router = require("express").Router()

router.post("/user/product",productController.addProduct);
router.get("/user/products",productController.allProducts);
router.get("/user/product/:key",productController.searchProduct);

module.exports = router;
