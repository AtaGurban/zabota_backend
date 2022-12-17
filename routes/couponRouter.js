const Router = require('express')

const CouponControllers = require('../controllers/CouponControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/', CouponControllers.create)



module.exports = router 