const Router = require('express')

const UserControllers = require('../controllers/UserControllers')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const router = new Router()




// router.post('/registration', checkRoleMiddleware('ADMIN'), UserControllers.registration)
router.post('/registration', UserControllers.registration)
router.post('/login', UserControllers.login)
router.get('/auth', authMiddleware, UserControllers.check)
router.delete('/', checkRoleMiddleware('ADMIN'), UserControllers.deleteUser)
router.get('/', checkRoleMiddleware('ADMIN'), UserControllers.getAllUsers)
router.put('/', checkRoleMiddleware('ADMIN'), UserControllers.updateUser)

module.exports = router