const ApiError = require("../error/ApiError");
const { TypeScenario, Deal, Contact } = require("../models/models");

class DealController {
    async getAll(req, res, next) { 
        try {
            const page = req?.query?.page || 1;
            const limit = req?.query?.limit || 25;
            const offset = (page - 1) * limit;
            let result = {}
            const typeScenario = await TypeScenario.findAll()
            for (let i = 0; i < typeScenario.length; i++) {
                const element = typeScenario[i];
                result[`${element.id}`] = await Deal.findAndCountAll({ offset, limit, where:{typeScenarioId: element.id} })
                console.log(result[`${element.id}`].rows.length);
                for (let j = 0; j < result[`${element.id}`].rows.length; j++) {
                    const elementTwo = result[`${element.id}`].rows[j];
                    elementTwo.contact = await Contact.findOne({where:{contact_id: elementTwo?.client_id}})
                    console.log(elementTwo);
                }
                
            }
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
            for (let i = 0; i < typeScenario.length; i++) {
                const element = typeScenario[i];
                result[`${element.id}`] = await Deal.findAndCountAll({ offset, limit, where:{typeScenarioId: element.id} })
            }
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