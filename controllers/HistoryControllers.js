const ApiError = require("../error/ApiError");
const { HistorySendCoupon, HistoryHappedBirtDay, Deal, HistoryReferralToAnotherSpecialist } = require("../models/models");

class HistoryController {
  async createHistorySendCoupon(req, res, next) {
    try {
      const {userId, dealId, couponId } = req.body 
      if (!userId || !dealId || !couponId){
        return next(ApiError.badRequest('error'));
      }
      //   funcSendCoupon
      const historySendCoupon = await HistorySendCoupon.create({
        userId, dealId, couponId
      })
      return res.json(historySendCoupon);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async createHistoryHappedBirthday(req, res, next) {
    try {
      const {userId, dealId } = req.body 
      if (!userId || !dealId){
        return next(ApiError.badRequest('error'));
      }
      const historyHappedBirtday = await HistoryHappedBirtDay.create({
        userId, dealId
      })
      return res.json(historyHappedBirtday);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async createHistoryReferralToAnotherSpecialist(req, res, next) {
    try {
      const {userId, dealId, to } = req.body 
      if (!userId || !dealId || !to){
        return next(ApiError.badRequest('error'));
      }
      let update = {userId: to}
      await Deal.update(update, {where:{id: dealId}})
      const historyReferralToAnotherSpecialist = await HistoryReferralToAnotherSpecialist.create({
        userId, dealId, to
      })
      return res.json(historyReferralToAnotherSpecialist);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new HistoryController();
