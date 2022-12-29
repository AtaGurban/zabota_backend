const Router = require('express')

const CouponControllers = require('../controllers/CouponControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/',authMiddleware, CouponControllers.create)
router.get('/',authMiddleware, CouponControllers.getAll)
router.delete('/',authMiddleware, CouponControllers.delete)



module.exports = router 