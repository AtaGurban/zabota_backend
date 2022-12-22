const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {
  User,
  Call,
  Deal,
  HistoryHappedBirtDay,
  HistoryReferralToAnotherSpecialist,
  HistorySendCoupon,
} = require('../models/models')

class getEfficiencyUsersController {
  async getEfficiencyUsers(req, res, next) {
    try {
      let { filter, userId } = req.query
      filter = JSON.parse(filter)
      let result = []
      if (filter.date.min === 'null' && filter.date.max === 'null' && !userId) {
        const users = await User.findAll({
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out'
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return j.status !== 'SUCCESS'
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = element['birthday-history'].length || 0
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals = element?.deal?.length || 0
          const countSendCoupons = element['coupon-history'].length || 0
          const referralToAnotherSpecialist = element['referral-history'].length || 0
          const talkTime = (
            element?.call.reduce(function (summ, item) {
              return summ + item.duration
            }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
          })
        }
      }
      if (filter.date.min !== 'null' && filter.date.max === 'null' && !userId) {
        const users = await User.findAll({
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out' && +new Date(j.updatedAt) > +new Date(filter.date.min)
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return +new Date(j.updatedAt) > +new Date(filter.date.min)
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min !== 'null' && filter.date.max === 'null' && userId) {
        const users = await User.findAll({
          where: { id: userId },
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out' && +new Date(j.updatedAt) > +new Date(filter.date.min)
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return +new Date(j.updatedAt) > +new Date(filter.date.min)})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return +new Date(j.updatedAt) > +new Date(filter.date.min)
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min === 'null' && filter.date.max !== 'null' && !userId) {
        const users = await User.findAll({
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out' && +new Date(j.updatedAt) < +new Date(filter.date.max)
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return +new Date(j.updatedAt) < +new Date(filter.date.max)
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min !== 'null' && filter.date.max !== 'null' && !userId) {
        const users = await User.findAll({
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return (
              j.type === 'out' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max) &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max) &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return (
                  +new Date(j.updatedAt) < +new Date(filter.date.max) &&
                  +new Date(j.updatedAt) > +new Date(filter.date.min)
                )
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min !== 'null' && filter.date.max !== 'null' && userId) {
        const users = await User.findAll({
          where: { id: userId },
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return (
              j.type === 'out' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max) &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max) &&
              +new Date(j.updatedAt) > +new Date(filter.date.min)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return (+new Date(j.updatedAt) < +new Date(filter.date.max)) && (+new Date(j.updatedAt) > +new Date(filter.date.min))})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return (
                  +new Date(j.updatedAt) < +new Date(filter.date.max) &&
                  +new Date(j.updatedAt) > +new Date(filter.date.min)
                )
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min === 'null' && filter.date.max !== 'null' && userId) {
        const users = await User.findAll({
          where: { id: userId },
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out' && +new Date(j.updatedAt) < +new Date(filter.date.max)
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return (
              j.status !== 'SUCCESS' &&
              +new Date(j.updatedAt) < +new Date(filter.date.max)
            )
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = (element['birthday-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals =
            (element?.deal?.filter((j) => {
              return +new Date(j.updatedAt) > new Date(filter.date.min)
            })).length || 0
          const countSendCoupons = (element['coupon-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const referralToAnotherSpecialist = (element['referral-history'].filter(j => {return +new Date(j.updatedAt) < +new Date(filter.date.max)})).length
          const talkTime = (
            element?.call
              .filter((j) => {
                return +new Date(j.updatedAt) < +new Date(filter.date.max)
              })
              .reduce(function (summ, item) {
                return summ + item.duration
              }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
            user: `${element.firstName} ${element.lastName}`,
          })
        }
      }
      if (filter.date.min === 'null' && filter.date.max === 'null' && userId) {
        const users = await User.findAll({
          where: { id: userId },
          include: [
            { model: Call, as: 'call' },
            { model: Deal, as: 'deal' },
            { model: HistoryHappedBirtDay, as: 'birthday-history' },
            {
              model: HistoryReferralToAnotherSpecialist,
              as: 'referral-history',
            },
            { model: HistorySendCoupon, as: 'coupon-history' },
          ],
        })
        let now = new Date()
        for (let i = 0; i < users.length; i++) {
          const element = users[i]
          const outCallsCount = (element?.call?.filter((j) => {
            return j.type === 'out'
          })).length
          const errorCallsCount = (element?.call?.filter((j) => {
            return j.status !== 'SUCCESS'
          })).length
          const errorCallPrecent =
            outCallsCount > 0 ? (errorCallsCount / outCallsCount) * 100 : 0
          const happedBirtDay = element['birthday-history'].length || 0
          const filledEstimates = 0
          const linkToRegistration = 0
          const countDeals = element?.deal?.length || 0
          const countSendCoupons = element['coupon-history'].length || 0
          const referralToAnotherSpecialist = element['referral-history'].length || 0
          const talkTime = (
            element?.call.reduce(function (summ, item) {
              return summ + item.duration
            }, 0) / 3600
          ).toFixed(2)
          const timeInSystem = (
            (+now - +element.createdAt) /
            (3600 * 1000)
          ).toFixed(2)
          result.push({
            outCallsCount,
            errorCallsCount,
            errorCallPrecent: `${errorCallPrecent} %`,
            happedBirtDay,
            filledEstimates,
            linkToRegistration,
            countDeals,
            countSendCoupons,
            referralToAnotherSpecialist,
            talkTime,
            timeInSystem,
          })
        }
      }
      return res.json(result)
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest(error))
    }
  }
}

module.exports = new getEfficiencyUsersController()
