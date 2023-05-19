const cartController = require('../controllers/cart.controller');
const router = require('express').Router()
const { verifySession, verifyToken } = require('../middleware');
router.use(verifySession)

router.post('/user/cart', verifyToken, cartController.addCart);
router.get('/user/cart', verifyToken, cartController.getCartProducts)
router.put('/user/cart', verifyToken, cartController.removeCartProducts)

module.exports = router;