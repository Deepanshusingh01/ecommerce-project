const orderController = require('../controllers/order.controller')
const {auth} = require('../middleware');
const router = require('express').Router()
const { verifySession } = require('../middleware');
router.use(verifySession)

router.post('/create-checkout-session', auth.verifyToken, orderController.checkOutSession)

module.exports = router