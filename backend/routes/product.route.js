const productController = require('../controllers/product.controller');
const router = require('express').Router()
const upload = require('../utils/multer')
const {verifyAddProduct,verifyFindByPk } = require('../validation/productValidation')
const { verifySession, validate } = require('../middleware');

router.use(verifySession)

router.post('/user/product', upload.single('file'),verifyAddProduct, validate, productController.addProduct);
router.get('/user/products', productController.allProducts);
router.get('/user/product/:id', productController.findByPk)
router.delete('/user/product/delete', productController.deleteProduct)
module.exports = router;
