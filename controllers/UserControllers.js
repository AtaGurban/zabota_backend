const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, login, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency) => {
    return jwt.sign({ id, login, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency}, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        try { 
            const { login, firstName, lastName, password, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency } = req.body;

            if (!password || !login || !phone) {
                return next(ApiError.badRequest('Непольные данные'))
            }
            const candidateByLogin = await User.findOne({ where: { name } })
            const candidateByPhone = await User.findOne({ where: { phone } })
            if ( candidateByPhone || candidateByLogin) {
                return next(ApiError.badRequest('Пользователь с такими даннымы существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ login, password: hashPassword, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency})
            const token = generateJwt(user.id, user.login, firstName, lastName, user.phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(error))
        }

    }
    async login(req, res, next) {
        const { name, password } = req.body;
        if (!password || !name) {
            return next(ApiError.badRequest('Непольные данные'))
        }
        const user = await User.findOne({ where: { login: name } })
        if (!user) {
            return next(ApiError.internal('Такой пользователь не существует'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неправильный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name, user.role)
        return res.json({ token })
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role)
        return res.json({ token })
    }
}

module.exports = new UserController()