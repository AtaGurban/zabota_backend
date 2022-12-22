const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const { Event, EventHistory, User, Contact } = require('../models/models')

class LogController {
  async getLog(req, res, next) {
    try {
      let { dateMin, dateMax, eventId, userId, dealLike } = req.body
      let page = req.query.page || 1
      let limit = req.query.limit || 25
      const offset = (page - 1) * limit
      let logs
      if (
        !dateMax &&
        !dateMin &&
        !eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        !eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) } },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        !eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.gte]: new Date(dateMin) } },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        !eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        !eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        !eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        !eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            eventId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        !eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            userId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        !eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            userId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            userId,
            eventId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            userId,
            eventId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        dateMin &&
        eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            eventId,
            date: {
              [Op.and]: {
                [Op.gte]: new Date(dateMin),
                [Op.lte]: new Date(dateMax),
              },
            },
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) }, eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) }, eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        !eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) }, userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: { [Op.lte]: new Date(dateMax) },
            eventId,
            userId,
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        !eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) }, userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: { [Op.lte]: new Date(dateMax) },
            eventId,
            userId,
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        dateMax &&
        !dateMin &&
        !eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.lte]: new Date(dateMax) }, userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        eventId &&
        !userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.gte]: new Date(dateMin) }, eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: { [Op.gte]: new Date(dateMin) },
            eventId,
            userId,
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        !eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.gte]: new Date(dateMin) }, userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        !eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { date: { [Op.gte]: new Date(dateMin) } },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        dateMin &&
        eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: {
            date: { [Op.gte]: new Date(dateMin) },
            eventId,
            userId,
          },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        eventId &&
        userId &&
        !dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { eventId, userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            { model: Contact, as: 'contact' },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        !eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { userId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        eventId &&
        userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { userId, eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      if (
        !dateMax &&
        !dateMin &&
        eventId &&
        !userId &&
        dealLike
      ) {
        logs = await EventHistory.findAndCountAll({
          where: { eventId },
          include: [
            { model: User, as: 'user' },
            { model: Event, as: 'event' },
            {
              model: Contact,
              as: 'contact',
              where: { contact_name: { [Op.like]: `%${dealLike}%` } },
            },
          ],
          limit,
          offset,
        })
      }
      return res.json(logs)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error))
    }
  }
  async getEvents(req, res, next) {
    try {
      const items = await Event.findAll()
      return res.json(items)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error))
    }
  }
}

module.exports = new LogController()
