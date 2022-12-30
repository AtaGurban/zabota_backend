const ApiError = require("../error/ApiError");
const {
  Сoupon,
  TypeScenario,
  EndActionsScenario,
  ModuleForScenario,
  Scenario,
} = require("../models/models");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const {
  createRecallAction,
  createChangeStatusAction,
  createDeleteAction,
} = require("../service/createScenarioFuncTions");

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
        completedActionId,
        notDoneActionId,
        notRingUpActionId,
        typeScenarioIdId,
        reCallActionCount,
        changeStatusActionCount,
        deleteActionCount,
      } = req.body;
      if (
        !name ||
        !completedActionId ||
        !notDoneActionId ||
        !notRingUpActionId ||
        !typeScenarioIdId
      ) {
        return next(ApiError.badRequest("Непольные данные"));
      }
      const scenario = await Scenario.create({
        fromDate,
        untilDate,
        firstNew,
        name,
        completedActionId,
        notDoneActionId,
        notRingUpActionId,
        typeScenarioIdId,
      });

      for (let i = 0; i < reCallActionCount; i++) {
        const reCallAction = req.body[`reCallAction[${i}]`];
        await createRecallAction(reCallAction, scenario.id);
      }

      for (let i = 0; i < changeStatusActionCount; i++) {
        const changeStatusAction = req.body[`changeStatusAction[${i}]`];
        await createChangeStatusAction(changeStatusAction, scenario.id);
      }

      for (let i = 0; i < deleteActionCount; i++) {
        const deleteAction = req.body[`deleteAction[${i}]`];
        await createDeleteAction(deleteAction, scenario.id);
      }
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new ScenarioController();
