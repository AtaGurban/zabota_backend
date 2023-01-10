const { Op } = require("sequelize");
const ApiError = require("../error/ApiError");
const jwt_decode = require('jwt-decode')
const { TypeScenario, Deal, Contact } = require("../models/models");

class DealController {
  async getAll(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const { id } = jwt_decode(token); 
      const page = req?.query?.page || 1;
      const limit = req?.query?.limit || 25;
      const offset = (page - 1) * limit;
      let result = {};
      const typeScenario = await TypeScenario.findAll();
      for (let i = 0; i < typeScenario.length; i++) {
        const element = typeScenario[i];
        result[`${element.id}`] = await Deal.findAndCountAll({
          offset,
          limit,
          where: { typeScenarioId: element.id, userId: null },
          include: { model: Contact, as: "contact" },
        });
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getBirthday(req, res, next) {
    try {
    //   const page = req?.query?.page || 1;
    //   const limit = req?.query?.limit || 25;
    //   const offset = (page - 1) * limit;
      let result = {};
      const typeScenario = await TypeScenario.findAll();
      for (let i = 0; i < typeScenario.length; i++) {
        const element = typeScenario[i];
        result[`${element.id}`] = await Deal.findAll({
          where: { typeScenarioId: element.id, userId: null },
          include: { model: Contact, as: "contact" },
        });
      }
      let resultSearch = {};
      for (const key in result) {
        if (Object.hasOwnProperty.call(result, key)) {
          const element = result[key];
          resultSearch[`${key}`] = element?.filter((i) => {
            if (i.dataValues?.contact?.birthdate) {
              const birthdate = new Date(i.dataValues?.contact?.birthdate);
              const birthdateDay = birthdate.getUTCDate();
              const birthdateMonth = birthdate.getUTCMonth() + 1;
              const now = new Date();
              const nowDate = now.getUTCDate();
              const nowMonth = now.getUTCMonth() + 1;
              return birthdateDay === nowDate && birthdateMonth === nowMonth;
            } else {
              return false;
            }
          });
        }
      }
      return res.json(resultSearch);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getSearch(req, res, next) {
    try {
        const page = req?.query?.page || 1;
        const query = req?.query?.query
        const limit = req?.query?.limit || 25;
        const offset = (page - 1) * limit;
        if (!query){
            return next(ApiError.badRequest('error'));
        }
        let result = {};
        const typeScenario = await TypeScenario.findAll();
        for (let i = 0; i < typeScenario.length; i++) {
          const element = typeScenario[i];
          result[`${element.id}`] = await Deal.findAndCountAll({
            offset,
            limit,
            where: { typeScenarioId: element.id, userId: null },
            include: { model: Contact, as: "contact", where: { contact_name: { [Op.like]: `%${query}%` } }, },
          });
        }
        return res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new DealController();
