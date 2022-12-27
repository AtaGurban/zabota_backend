const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const { User, Event, EventHistory } = require('../models/models')
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode')

const generateJwt = (id, role, login, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency) => {
    return jwt.sign({ id, role, login, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
    async registration(req, res, next) {
        try {
            const { login, firstName, lastName, password, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency } = req.body;

            if (!password || !login || !phone) {
                return next(ApiError.badRequest('Непольные данные'))
            } 
            const candidateByLogin = await User.findOne({ where: { login, deleted:false } })
            const candidateByPhone = await User.findOne({ where: { phone, deleted:false } })
            if (candidateByPhone || candidateByLogin) {
                return next(ApiError.badRequest('Пользователь с такими даннымы существует'))
            }
            // const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ login, password, firstName, lastName, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency })
            const token = generateJwt(user.id, user.role, user.login, firstName, lastName, user.phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency)
            return res.json({ token })
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            if (!password || !login) {
                return next(ApiError.badRequest('Непольные данные'))
            }
            const user = await User.findOne({ where: { login, deleted: false } })
            if (!user) {
                return next(ApiError.internal('Такой пользователь не существует'))
            }
            let comparePassword = password === user.password
            if (!comparePassword) {
                return next(ApiError.internal('Пароль не верный проверьте пароль или попросите отправить вам повторно пароль'))
            }
            const eventLogin = await Event.findOne({where:{event: 'Вход систему'}})
            const historyItem = await EventHistory.create({
                eventId: eventLogin.id,
                userId: req.user.id
            })
            const token = generateJwt(user.id, user.role, user.login, user.firstName, user.lastName, user.phone, user.customerService, user.customerDataBase, user.scenarioSettings, user.userSettings, user.eventLog, user.employeeEfficiency)
            return res.json({ token })
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
    async check(req, res, next) {
        try {
            const eventLogin = await Event.findOne({where:{event: 'Вход систему'}})
            const historyItem = await EventHistory.create({
                eventId: eventLogin.id,
                userId: req.user.id
            })
            const token = generateJwt(req.user.id, req.user.role, req.user.login, req.user.firstName, req.user.lastName, req.user.phone, req.user.customerService, req.user.customerDataBase, req.user.scenarioSettings, req.user.userSettings, req.user.eventLog, req.user.employeeEfficiency)
            return res.json({ token })
        } catch (error) {
            return next(ApiError.badRequest(error))
        }

    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.query;
            const token = req.headers.authorization.split(' ')[1]
            const { login } = jwt_decode(token); 
            const decodedUser = await User.findOne({ where: { login } });
            if (!id) {
                return next(ApiError.badRequest('Id не указан'))
            }
            if (decodedUser.id === id) {
                return next(ApiError.badRequest('Вы не можете удалить самого себя'))
            }
            const user = await User.findOne({ where: { id } })
            if (!user) {
                return next(ApiError.internal('Такой пользователь не существует'))
            }
            let updateDeletedUser = { deleted: true }
            let deletedUser = await User.update(updateDeletedUser, { where: { id } })
            return res.json(deletedUser)
        } catch (error) {
            return next(ApiError.badRequest(error))
        }

    }
    async getAllUsers(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const { login } = jwt_decode(token); 
            const decodedUser = await User.findOne({ where: { login } });
            let users
            if (decodedUser.role === 'ADMIN'){
                users = await User.findAll()
            } else {
                users = await User.findAll({ where: { role: 'USER' } })
            }
            return res.json(users)
        } catch (error) {
            return next(ApiError.badRequest(error))
        }
 
    }
    async updateUser(req, res, next) {
        try {
            const { id, login, firstName, lastName, password, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Id не указан'))
            }
            const temp = { login, firstName, lastName, password, phone, customerService, customerDataBase, scenarioSettings, userSettings, eventLog, employeeEfficiency }
            let updateUser = {}
            for (const key in temp) {
                if (temp[key]) {
                    updateUser[key] = temp[key]
                }
            }
            if (updateUser.login){
                console.log(updateUser);
                const checkUser = await User.findOne({where:{login: updateUser.login}})
                if (checkUser){
                    return next(ApiError.badRequest('Пользователь с таким логином существует'))
                }
            }
            if (updateUser.phone){
                const checkUser = await User.findOne({where:{phone: updateUser.phone}})
                if (checkUser){
                    return next(ApiError.badRequest('Пользователь с таким телефоном существует'))
                }
            }
            const updatedUser = await User.update(updateUser, { where: { id } })
            return res.json(updatedUser)
        } catch (error) {
            return next(ApiError.badRequest(error))
        }

    }
}

module.exports = new UserController()