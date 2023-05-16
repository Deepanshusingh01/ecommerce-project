const orderController = require('../controller/order.controller')
const {auth} = require('../middleware');
const router = require('express').Router()

router.post('/create-checkout-session', auth.verifyToken, orderController.checkOutSession)

module.exports = router