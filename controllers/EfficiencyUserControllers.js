const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const {
  Event,
  EventHistory,
  User,
  Contact,
  Call,
  Deal,
} = require("../models/models");

class getEfficiencyUsersController {
  async getEfficiencyUsers(req, res, next) {
    try {
      const users = await User.findAll({
        include: [
          { model: Call, as: "call" },
          { model: Deal, as: "deal" },
        ],
      });
      let result = [];
      let now = new Date()
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        const outCallsCount = (element?.call?.filter((j) => {
          return j.type === "out";
        })).length;
        const errorCallsCount = (element?.call?.filter((j) => {
          return j.status !== "SUCCESS";
        })).length;
        const errorCallPrecent = (errorCallsCount / outCallsCount) * 100;
        const happedBirtDay = 0;
        const filledEstimates = 0;
        const linkToRegistration = 0;
        const countDeals = element?.deal?.length || 0;
        const countSendCoupons = 0
        const referralToAnotherSpecialist = 0
        const talkTime = ((element?.call.reduce(function (summ, item){
            return summ + item.duration
        }, 0)) / 3600).toFixed(2)
        const timeInSystem = ((+now - (+element.createdAt)) / (3600 * 1000)).toFixed(2)
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
          timeInSystem
        });
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new getEfficiencyUsersController();
