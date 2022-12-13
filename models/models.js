const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},  
    email: {type:DataTypes.STRING, unique: true},
    phone: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    com: {type: DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: 'USER'},
    firstRate: {type:DataTypes.FLOAT, defaultValue: 0},
    secondRate: {type:DataTypes.FLOAT, defaultValue: 0},
    thirdRate: {type:DataTypes.FLOAT, defaultValue: 0},
})
 
const Customer = sequelize.define('customer', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},  
    email: {type:DataTypes.STRING, unique: true},
    phone: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    birthDay: {type: DataTypes.DATE},
    linkDate: {type:DataTypes.DATE, defaultValue: null},
    status: {type:DataTypes.STRING},  
})

const Сoupon = sequelize.define('coupon', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING},  
})

const Call = sequelize.define('call', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    type: {type:DataTypes.STRING},  
    phoneCustomer: {type:DataTypes.STRING},  
    phoneUser: {type:DataTypes.STRING},  
    start: {type:DataTypes.DATE},  
    duration: {type:DataTypes.INTEGER},  
    callIdByBATC: {type:DataTypes.STRING},  
    linkAudio: {type:DataTypes.STRING},  
    rating: {type:DataTypes.INTEGER},  
    status: {type:DataTypes.STRING},  
})


User.hasMany(Customer, {as: 'customer'})

User.hasMany(Call, {as: 'call'})

Customer.hasMany(Сoupon, {as: 'coupon'})

Customer.hasMany(Call, {as: 'call'})



module.exports = {
    User, Customer, Сoupon, Call
}