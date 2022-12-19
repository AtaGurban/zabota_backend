const Router = require('express')

const EfficiencyUserControllers = require('../controllers/EfficiencyUserControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/', EfficiencyUserControllers.getEfficiencyUsers)



module.exports = router 