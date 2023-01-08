const Router = require('express')

const DealControllers = require('../controllers/DealControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.get('/',authMiddleware, DealControllers.getAll)
router.get('/search',authMiddleware, DealControllers.getSearch)
router.get('/birthday',authMiddleware, DealControllers.getBirthday)




module.exports = router 