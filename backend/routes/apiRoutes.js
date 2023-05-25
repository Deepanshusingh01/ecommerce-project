const router = require('express').Router()
const { userV1, productV1, orderV1, cartV1 } = require('./index')

router.use('/v1/', productV1)
router.use('/v1/', cartV1)
router.use('/v1/', orderV1)
router.use('/v1/', userV1)

module.exports = router