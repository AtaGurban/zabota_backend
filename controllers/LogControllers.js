const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const { Event, EventHistory, User, Contact } = require("../models/models");


class LogController {
    async getLog(req, res, next) {
        try {
            let { filter, eventId, userId, dealLike } = req.query;
            let page = req.query.page || 1
            let limit = req.query.limit || 25
            const offset = (page - 1) * limit;
            filter = JSON.parse(filter)
            let logs
            console.log(limit);
            if ((filter.date.max === '') && (filter.date.min === '') && (!eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max !== '') && (filter.date.min === '') && (!eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.lte]: new Date(filter.date.max)}}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min !== '') && (!eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.gte]: new Date(filter.date.min)}}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {eventId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (!eventId) && (userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (!eventId) && (!userId) && (dealLike !== '')){
                logs = await EventHistory.findAndCountAll({ include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact', where:{contact_name: {[Op.like]: `%${dealLike}%`}}}], limit, offset})
            }
            if ((filter.date.max !== '') && (filter.date.min !== '') && (!eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.and]: {[Op.gte]: new Date(filter.date.min), [Op.lte]: new Date(filter.date.max)} }}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max !== '') && (filter.date.min === '') && (eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.lte]: new Date(filter.date.max)}, eventId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max !== '') && (filter.date.min === '') && (!eventId) && (userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.lte]: new Date(filter.date.max)}, userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max !== '') && (filter.date.min === '') && (!eventId) && (!userId) && (dealLike !== '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.lte]: new Date(filter.date.max)}, userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact', where:{contact_name: {[Op.like]: `%${dealLike}%`}}}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min !== '') && (eventId) && (!userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.gte]: new Date(filter.date.min)}, eventId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min !== '') && (!eventId) && (userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.gte]: new Date(filter.date.min)}, userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min !== '') && (!eventId) && (!userId) && (dealLike !== '')){
                logs = await EventHistory.findAndCountAll({where: {date: {[Op.gte]: new Date(filter.date.min)}, userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact', where:{contact_name: {[Op.like]: `%${dealLike}%`}}}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (eventId) && (userId) && (dealLike === '')){
                logs = await EventHistory.findAndCountAll({where: {eventId, userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact'}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (!eventId) && (userId) && (dealLike !== '')){
                logs = await EventHistory.findAndCountAll({where: {userId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact', where:{contact_name: {[Op.like]: `%${dealLike}%`}}}], limit, offset})
            }
            if ((filter.date.max === '') && (filter.date.min === '') && (eventId) && (!userId) && (dealLike !== '')){
                logs = await EventHistory.findAndCountAll({where: {eventId}, include:[{model: User, as: 'user'}, {model: Event, as: 'event'}, {model: Contact, as: 'contact', where:{contact_name: {[Op.like]: `%${dealLike}%`}}}], limit, offset})
            }
            console.log(new Date(filter.date.max)); 
            console.log(filter, eventId, userId, dealLike);
            return res.json(logs)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
    async getEvents(req, res, next) { 
        try {
            const items = await Event.findAll() 
            return res.json(items)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
}

module.exports = new LogController()