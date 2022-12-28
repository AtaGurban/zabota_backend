const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

module.exports = async function (req, res, next){
    if (req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            return  res.status(401).json({body: 'Вход не выполнен'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const {login, password, id} = decoded
        const user = await User.findOne({where:{id}})
        let comparePassword = password === user.password
        let compareLogin = login === user.login
        if (!compareLogin || !comparePassword){
            return  res.status(401).json({body: 'Вход не выполнен'})
        } else{
            req.user = decoded
            next()
        }
    } catch (e) {
        res.status(401).json({body: 'Вход не выполнен'})
    }
}