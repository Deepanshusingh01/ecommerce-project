const productController = require('../controller/product.controller');
const router = require('express').Router()
const upload = require('../utils/multer')

router.post('/user/product', upload.single('file'), productController.addProduct);
router.get('/user/products', productController.allProducts);
router.get('/user/product/:id', productController.findByPk)
module.exports = router;
