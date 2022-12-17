const sequelize = require('../db')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    login: {type:DataTypes.STRING, unique: true},  
    firstName: {type:DataTypes.STRING},  
    lastName: {type:DataTypes.STRING},  
    // email: {type:DataTypes.STRING, unique: true},
    phone: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    com: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN, defaultValue: false},
    customerService: {type: DataTypes.BOOLEAN, defaultValue: false},
    customerDataBase: {type: DataTypes.BOOLEAN, defaultValue: false},
    scenarioSettings: {type: DataTypes.BOOLEAN, defaultValue: false},
    userSettings: {type: DataTypes.BOOLEAN, defaultValue: false},
    eventLog: {type: DataTypes.BOOLEAN, defaultValue: false},
    employeeEfficiency: {type: DataTypes.BOOLEAN, defaultValue: false},
    role: {type:DataTypes.STRING, defaultValue: 'USER'},
    // firstRate: {type:DataTypes.FLOAT, defaultValue: 0},
    // secondRate: {type:DataTypes.FLOAT, defaultValue: 0},
    // thirdRate: {type:DataTypes.FLOAT, defaultValue: 0},
})
  
// const Customer = sequelize.define('customer', {
//     id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
//     name: {type:DataTypes.STRING},  
//     email: {type:DataTypes.STRING, unique: true},
//     phone: {type:DataTypes.STRING, unique: true},
//     password: {type:DataTypes.STRING},
//     birthDay: {type: DataTypes.DATE},
//     linkDate: {type:DataTypes.DATE, defaultValue: null},
//     status: {type:DataTypes.STRING},  
// })

const Сoupon = sequelize.define('coupon', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING},  
    description: {type:DataTypes.STRING},  
    contacts: {type:DataTypes.STRING},  
    img: {type:DataTypes.STRING},
    count: {type:DataTypes.BIGINT},
    limited: {type:DataTypes.BOOLEAN},
})

const EventHistory = sequelize.define('event-history', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true}, 
    date: {type:DataTypes.DATE},  
})

const Event = sequelize.define('event', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true}, 
    event: {type:DataTypes.STRING},  
})

const Status = sequelize.define('status', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    status_id: {type:DataTypes.INTEGER},  
    status_name: {type:DataTypes.STRING},  
})

const Deal = sequelize.define('deal', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    deal_id: {type:DataTypes.INTEGER},  
    price: {type:DataTypes.BIGINT},  
    price_second: {type:DataTypes.INTEGER},  
    status_id: {type:DataTypes.INTEGER},  
    manager_id: {type:DataTypes.INTEGER},  
    second_manager_id: {type:DataTypes.INTEGER},  
    lawyer_id: {type:DataTypes.INTEGER},  
    broker_id: {type:DataTypes.INTEGER},  
    client_id: {type:DataTypes.INTEGER},  
    comment: {type:DataTypes.TEXT},   
    abc_status: {type:DataTypes.STRING},  
    complete: {type:DataTypes.BOOLEAN},  
    deleted: {type:DataTypes.BOOLEAN},  
}) 

const Manager = sequelize.define('manager', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    manager_id: {type:DataTypes.BIGINT},  
    manager_name: {type:DataTypes.STRING},  
    manager_phone: {type:DataTypes.STRING},  
    manager_email: {type:DataTypes.STRING},  
    manager_position: {type:DataTypes.STRING},  
})

const Contact = sequelize.define('contact', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    contact_id: {type:DataTypes.BIGINT},  
    contact_name: {type:DataTypes.STRING},  
    contact_phone_two: {type:DataTypes.STRING},  
    contact_phone: {type:DataTypes.STRING},  
    contact_email: {type:DataTypes.STRING},  
    contact_type: {type:DataTypes.STRING},  
    birthdate: {type:DataTypes.DATE},  
    manager_id: {type:DataTypes.INTEGER},  
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

const Rating = sequelize.define('rating', {
    id: {type:DataTypes.BIGINT, primaryKey: true, autoIncrement: true},
    rate: {type:DataTypes.FLOAT, defaultValue: 0},
    type: {type:DataTypes.STRING, defaultValue: ''},
    count: {type:DataTypes.BIGINT, defaultValue: 0} 
})



Manager.hasMany(Rating, {as: 'rating'})

User.hasMany(Deal, {as: 'deal'})

User.hasMany(EventHistory, {as: 'history'})
EventHistory.belongsTo(User, {as: 'user'})

Event.hasMany(EventHistory, {as: 'history'})
EventHistory.belongsTo(Event, {as: 'event'})

User.hasMany(Call, {as: 'call'}) 

Contact.hasMany(EventHistory, {as: 'history'})
EventHistory.belongsTo(Contact, {as: 'contact'})
 
Deal.hasMany(Сoupon, {as: 'coupon'})

Contact.hasMany(Call, {as: 'call'})



module.exports = {
    User, Сoupon, Call, Event, EventHistory, Status, Manager, Contact, Deal, Rating
}