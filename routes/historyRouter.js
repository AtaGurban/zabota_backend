const Router = require('express')

const HistoryControllers = require('../controllers/HistoryControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/send-coupon', authMiddleware, HistoryControllers.createHistorySendCoupon)
router.post('/happed-birthday', authMiddleware, HistoryControllers.createHistoryHappedBirthday)
router.post('/referral-specialist', authMiddleware, HistoryControllers.createHistoryReferralToAnotherSpecialist)


module.exports = router 