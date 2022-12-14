const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const logRouter = require('./logRouter')
const efficiencyUserRouter = require('./efficiencyUserRouter')
const couponRouter = require('./couponRouter')
const scenarioRouter = require('./scenarioRouter')
const dealRouter = require('./dealRouter')
const historyRouter = require('./historyRouter')



   
router.use('/user', userRouter)
router.use('/log', logRouter)
router.use('/efficiency-user', efficiencyUserRouter)
router.use('/coupon', couponRouter)
router.use('/scenario', scenarioRouter)
router.use('/deals', dealRouter)
router.use('/history', historyRouter)




module.exports = router 