const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const logRouter = require('./logRouter')



   
router.use('/user', userRouter)
router.use('/log', logRouter)




module.exports = router 