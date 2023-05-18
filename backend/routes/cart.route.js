const cartController = require('../controllers/cart.controller');
const {auth} = require('../middleware')
const router = require('express').Router()
const { verifySession } = require('../middleware');
router.use(verifySession)

router.post('/user/cart', auth.verifyToken, cartController.addCart);
router.get('/user/cart', auth.verifyToken, cartController.getCartProducts)
router.put('/user/cart', auth.verifyToken, cartController.removeCartProducts)

module.exports = router;