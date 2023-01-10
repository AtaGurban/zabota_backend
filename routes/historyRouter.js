const Router = require('express')

const HistoryControllers = require('../controllers/HistoryControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/send-coupon', authMiddleware, HistoryControllers.createHistorySendCoupon)
router.post('/happed-birthday', authMiddleware, HistoryControllers.createHistoryHappedBirthday)
router.post('/referral-specialist', authMiddleware, HistoryControllers.createHistoryReferralToAnotherSpecialist)
router.get('/send-coupon', authMiddleware, HistoryControllers.getByDealIdHistorySendCoupon)
router.get('/happed-birthday', authMiddleware, HistoryControllers.getByDealIdHistoryHappedBirthday)
// router.get('/referral-specialist', authMiddleware, HistoryControllers.getByDealIdHistoryReferralToAnotherSpecialist)


module.exports = router 