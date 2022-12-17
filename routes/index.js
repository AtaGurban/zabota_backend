const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const logRouter = require('./logRouter')
const couponRouter = require('./couponRouter')



   
router.use('/user', userRouter)
router.use('/log', logRouter)
router.use('/coupon', couponRouter)




module.exports = router 