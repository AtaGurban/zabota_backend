const Router = require('express')

const ScenarioControllers = require('../controllers/ScenarioControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()

router.post('/type', authMiddleware, ScenarioControllers.createTypeScenario)
router.get('/type', authMiddleware, ScenarioControllers.getTypeScenario)
router.delete('/type', ScenarioControllers.deleteTypeScenario)
router.put('/type', authMiddleware, ScenarioControllers.updateTypeScenario)
router.get('/end-actions', authMiddleware, ScenarioControllers.getEndActionsScenario)
router.get('/module', authMiddleware, ScenarioControllers.getModuleScenario)
router.post('/', authMiddleware, ScenarioControllers.createScenario)
router.put('/', authMiddleware, ScenarioControllers.updateScenario)
router.get('/', authMiddleware, ScenarioControllers.getScenario)
router.put('/prioritet', authMiddleware, ScenarioControllers.updatePrioritet)
router.delete('/', authMiddleware, ScenarioControllers.deleteScenario)




module.exports = router 