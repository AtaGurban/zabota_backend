const Router = require('express')

const LogControllers = require('../controllers/LogControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()


// router.get('/', authMiddleware, LogControllers.getLog)
router.get('/', LogControllers.getLog)
router.get('/events', authMiddleware, LogControllers.getEvents)


module.exports = router 