const ApiError = require("../error/ApiError");
const {
  Сoupon,
  TypeScenario,
  EndActionsScenario,
  ModuleForScenario,
} = require("../models/models");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

class ScenarioController {
  async createTypeScenario(req, res, next) {
    try {
      let { name, color } = req.body;
      if (!name || !color) {
        return next(ApiError.badRequest("Непольные данные"));
      }
      const number = (await TypeScenario.count()) + 1;
      const checkTypeScenario = await TypeScenario.findOne({ where: { name } });
      if (checkTypeScenario) {
        return next(ApiError.badRequest("Такой тип сценарии уже существует"));
      }

      const typeScenario = await TypeScenario.create({
        name,
        color,
        number,
      });
      return res.json(typeScenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getTypeScenario(req, res, next) {
    try {
      const typeScenarioAll = await TypeScenario.findAll();
      return res.json(typeScenarioAll);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async deleteTypeScenario(req, res, next) {
    try {
      const { id } = req.query;
      const typeScenario = await TypeScenario.findOne({ where: { id } });
      if (typeScenario) {
      }
      return res.json(typeScenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async updateTypeScenario(req, res, next) {
    try {
      const { id, name, color, number } = req.body;
      if (!id) {
        return next(ApiError.badRequest("Такой тип сценарии не существует"));
      }
      const typeScenario = await TypeScenario.findOne({ where: { id } });
      if (!typeScenario) {
        return next(ApiError.badRequest("Такой тип сценарии не существует"));
      }
      const checkNameTypeScenario = await TypeScenario.findOne({
        where: { name, id: { [Op.not]: id } },
      });
      if (checkNameTypeScenario) {
        return next(
          ApiError.badRequest("Сценарии с таким названием уже существует")
        );
      }
      let update = { name, color, number };
      const updatedTypeScenario = await TypeScenario.update(update, {
        where: { id },
      });
      return res.json(updatedTypeScenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getEndActionsScenario(req, res, next) {
    try {
      const endActionsScenarioList = await EndActionsScenario.findAll();
      return res.json(endActionsScenarioList);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getModuleScenario(req, res, next) {
    try {
      const moduleScenarioList = await ModuleForScenario.findAll();
      return res.json(moduleScenarioList);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async createScenario(req, res, next) {
    try {
      let {
        name,
        fromDate,
        untilDate,
        firstNew,
        completedAction,
        notDoneAction,
        notRingUpAction,
        typeScenarioId,
        reCallAction,
        changeStatusAction,
        deleteAction
      } = req.body;
      if (!name || !color) {
        return next(ApiError.badRequest("Непольные данные"));
      }
      const number = (await TypeScenario.count()) + 1;
      const checkTypeScenario = await TypeScenario.findOne({ where: { name } });
      if (checkTypeScenario) {
        return next(ApiError.badRequest("Такой тип сценарии уже существует"));
      }

      const typeScenario = await TypeScenario.create({
        name,
        color,
        number,
      });
      return res.json(typeScenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new ScenarioController();
