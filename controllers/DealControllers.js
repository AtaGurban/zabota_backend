const ApiError = require("../error/ApiError");
const { TypeScenario, Deal } = require("../models/models");

class DealController {
    async getAll(req, res, next) { 
        try {
            const page = req?.query?.page || 1;
            const limit = req?.query?.limit || 25;
            const offset = (page - 1) * limit;
            let result = {}
            const typeScenario = await TypeScenario.findAll()
            typeScenario.map(async (i)=>{
                result[`${i.id}`] = await Deal.findAndCountAll({ offset, limit, where:{typeScenarioId: i.id}, include:{model} })
            })
            return res.json(result)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
    async getBirthday(req, res, next) { 
        try {
            const {birthday} = req.query
            const page = req?.query?.page || 1;
            const limit = req?.query?.limit || 25;
            if (!birthday){
                return next(ApiError.badRequest('error'))
            }
            const offset = (page - 1) * limit;
            let result = {}
            const typeScenario = await TypeScenario.findAll()
            typeScenario.map(async (i)=>{
                result[`${i.id}`] = await Deal.findAndCountAll({ offset, limit, where:{typeScenarioId: i.id} })
            })
            return res.json(result)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
    async getSearch(req, res, next) { 
        try {
            const page = req?.query?.page || 1;
            const limit = req?.query?.limit || 25;
            const offset = (page - 1) * limit;
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
}

module.exports = new DealController()