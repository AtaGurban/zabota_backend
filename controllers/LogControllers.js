const ApiError = require("../error/ApiError");
const { Event } = require("../models/models");

class LogController {
    async getLog(req, res, next) {
        try {
            const { filter, eventId, userId, dealLike } = req.query;
            console.log(filter, eventId, userId, dealLike);
            return res.json({ token })
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