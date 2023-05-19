const orderController = require('../controllers/order.controller')
const router = require('express').Router()
const { verifySession, verifyToken } = require('../middleware');
router.use(verifySession)

router.post('/create-checkout-session', verifyToken, orderController.checkOutSession)

module.exports = router