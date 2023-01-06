const ApiError = require("../error/ApiError");
const {
  TypeScenario,
  EndActionsScenario,
  ModuleForScenario,
  Scenario,
  DeleteAction,
  ChangeStatusAction,
  ReCallAction,
  ModuleText,
  ModuleTextWithTitle,
  ModuleComment,
  ModuleSendLink,
  ModuleReferralSpecialist,
  ModuleRatingUser,
  ModuleSendCoupon,
  ModuleDropdown,
  ModuleDropdownItems,
  ModuleCheckList,
  ModuleCheckListItems,
  ScenarioPrioritet,
} = require("../models/models");
const { Op } = require("sequelize");
const {
  createRecallAction,
  createChangeStatusAction,
  createDeleteAction,
  createModuleText,
  createModuleTextTitle,
  createModuleSendLink,
  createModuleSendCoupon,
  createModuleReferralSpecialist,
  createModuleRatingUser,
  createModuleDropdown,
  createModuleComment,
  createModuleChekList,
  changeTypeScenario,
  deleteScenarioBytypeScenarioId,
  deleteActionScenario,
  deleteModuleByScenarioId,
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
      const { id, typeScenarioId } = req.query;
      if (!id || !typeScenarioId) {
        return next(ApiError.badRequest("error"));
      } else if (id == typeScenarioId) {
        return next(ApiError.badRequest("error"));
      }
      const typeScenario = await TypeScenario.findOne({ where: { id } });
      if (typeScenario && typeScenarioId) {
        await changeTypeScenario(id, typeScenarioId);
      }
      if (typeScenario) {
        await deleteScenarioBytypeScenarioId(id);
        await typeScenario.destroy();
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
        typeScenarioId,
        reCallActionCount,
        changeStatusActionCount,
        deleteActionCount,
        moduleTextCount,
        moduleTextTitleCount,
        moduleSendLinkCount,
        moduleSendCouponCount,
        moduleReferralSpecialistCount,
        moduleRatingUserCount,
        moduleDropdownCount,
        moduleCommentCount,
        moduleCheckListCount,
      } = req.body;
      if (
        !name ||
        !typeScenarioId ||
        !notRingUpActionId ||
        !notDoneActionId ||
        !completedActionId ||
        !id ||
        !reCallActionCount ||
        !changeStatusActionCount ||
        !deleteActionCount ||
        !moduleCheckListCount ||
        !moduleCommentCount ||
        !moduleDropdownCount ||
        !moduleRatingUserCount ||
        !moduleReferralSpecialistCount ||
        !moduleSendCouponCount ||
        !moduleSendLinkCount ||
        !moduleTextCount ||
        !moduleTextTitleCount
      ) {
        return next(ApiError.badRequest("Непольные данные"));
      }
      if (firstNew !== null) {
        firstNew = firstNew === "true" ? true : false;
      }
      const scenario = await Scenario.create({
        fromDate: new Date(fromDate),
        untilDate: new Date(untilDate),
        firstNew,
        name,
        completedActionId,
        notDoneActionId,
        notRingUpActionId,
        typeScenarioId,
      });
      const scenarioCount = await Scenario.count();
      for (let i = 1; i < scenarioCount + 1; i++) {
        const prioritetNumber = await ScenarioPrioritet.findOne({
          where: { number: i },
        });
        if (!prioritetNumber) {
          await ScenarioPrioritet.create({
            number: i,
            scenarioId: scenario.id,
          });
          break;
        }
      }

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

      for (let i = 0; i < moduleTextCount; i++) {
        const moduleText = req.body[`moduleText[${i}]`];
        await createModuleText(moduleText, scenario.id);
      }

      for (let i = 0; i < moduleTextTitleCount; i++) {
        const moduleTextTitle = req.body[`moduleTextTitle[${i}]`];
        await createModuleTextTitle(moduleTextTitle, scenario.id);
      }

      for (let i = 0; i < moduleSendLinkCount; i++) {
        const moduleSendLink = req.body[`moduleSendLink[${i}]`];
        await createModuleSendLink(moduleSendLink, scenario.id);
      }

      for (let i = 0; i < moduleSendCouponCount; i++) {
        const moduleSendCoupon = req.body[`moduleSendCoupon[${i}]`];
        await createModuleSendCoupon(moduleSendCoupon, scenario.id);
      }

      for (let i = 0; i < moduleReferralSpecialistCount; i++) {
        const moduleReferralSpecialist =
          req.body[`moduleReferralSpecialist[${i}]`];
        await createModuleReferralSpecialist(
          moduleReferralSpecialist,
          scenario.id
        );
      }

      for (let i = 0; i < moduleRatingUserCount; i++) {
        const moduleRatingUser = req.body[`moduleRatingUser[${i}]`];
        await createModuleRatingUser(moduleRatingUser, scenario.id);
      }

      for (let i = 0; i < moduleDropdownCount; i++) {
        const moduleDropdownCount = req.body[`moduleDropdown[${i}]`];
        await createModuleDropdown(moduleDropdownCount, scenario.id);
      }

      for (let i = 0; i < moduleCommentCount; i++) {
        const moduleComment = req.body[`moduleComment[${i}]`];
        await createModuleComment(moduleComment, scenario.id);
      }

      for (let i = 0; i < moduleCheckListCount; i++) {
        const moduleCheckList = req.body[`moduleCheckList[${i}]`];
        await createModuleChekList(moduleCheckList, scenario.id);
      }
      return res.json(true);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async getScenario(req, res, next) {
    try {
      const { typeId } = req.query;
      let result;
      if (typeId) {
        result = await Scenario.findAll({
          where: { typeScenarioId: typeId },
          include: [
            { model: ScenarioPrioritet, as: "prioritet" },
            { model: DeleteAction, as: "delete-action" },
            { model: ChangeStatusAction, as: "change-status-action" },
            { model: ReCallAction, as: "recall-action" },
            { model: ModuleText, as: "module-text" },
            { model: ModuleTextWithTitle, as: "module-text-title" },
            { model: ModuleComment, as: "module-comment" },
            { model: ModuleSendLink, as: "module-send-link" },
            {
              model: ModuleReferralSpecialist,
              as: "module-referral-specialist",
            },
            { model: ModuleRatingUser, as: "module-rating-user" },
            { model: ModuleSendCoupon, as: "module-send-coupon" },
            {
              model: ModuleDropdown,
              as: "module-dropdown",
              include: {
                model: ModuleDropdownItems,
                as: "module-dropdown-items",
              },
            },
            {
              model: ModuleCheckList,
              as: "module-check-list",
              include: {
                model: ModuleCheckListItems,
                as: "module-check-list-items",
              },
            },
          ],
        });
      } else {
        result = await Scenario.findAll({
          include: [
            { model: ScenarioPrioritet, as: "prioritet" },
            { model: DeleteAction, as: "delete-action" },
            { model: ChangeStatusAction, as: "change-status-action" },
            { model: ReCallAction, as: "recall-action" },
            { model: ModuleText, as: "module-text" },
            { model: ModuleTextWithTitle, as: "module-text-title" },
            { model: ModuleComment, as: "module-comment" },
            { model: ModuleSendLink, as: "module-send-link" },
            {
              model: ModuleReferralSpecialist,
              as: "module-referral-specialist",
            },
            { model: ModuleRatingUser, as: "module-rating-user" },
            { model: ModuleSendCoupon, as: "module-send-coupon" },
            {
              model: ModuleDropdown,
              as: "module-dropdown",
              include: {
                model: ModuleDropdownItems,
                as: "module-dropdown-items",
              },
            },
            {
              model: ModuleCheckList,
              as: "module-check-list",
              include: {
                model: ModuleCheckListItems,
                as: "module-check-list-items",
              },
            },
          ],
        });
      }
      return res.json(result);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async updatePrioritet(req, res, next) {
    try {
      const { scenarioId, number } = req.body;
      const checkPrioritetNumber = await ScenarioPrioritet.findOne({
        where: { number },
      });
      if (checkPrioritetNumber) {
        return next(ApiError.badRequest("Этот приоритет занять"));
      } else {
        const prioritetScenario = await ScenarioPrioritet.findOne({
          where: { scenarioId },
        });
        if (prioritetScenario) {
          prioritetScenario.destroy();
        }
        const updatedPrioritetScenario = await ScenarioPrioritet.create({
          number,
          scenarioId,
        });
        return res.json(updatedPrioritetScenario);
      }
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async updateScenario(req, res, next) {
    try {
      let {
        fromDate,
        untilDate,
        firstNew,
        name,
        typeScenarioId,
        notRingUpActionId,
        notDoneActionId,
        completedActionId,
        id,
        reCallActionCount,
        changeStatusActionCount,
        deleteActionCount,
        moduleTextCount,
        moduleTextTitleCount,
        moduleSendLinkCount,
        moduleSendCouponCount,
        moduleReferralSpecialistCount,
        moduleRatingUserCount,
        moduleDropdownCount,
        moduleCommentCount,
        moduleCheckListCount,
      } = req.body;
      if (
        !name ||
        !typeScenarioId ||
        !notRingUpActionId ||
        !notDoneActionId ||
        !completedActionId ||
        !id ||
        !reCallActionCount ||
        !changeStatusActionCount ||
        !deleteActionCount ||
        !moduleCheckListCount ||
        !moduleCommentCount ||
        !moduleDropdownCount ||
        !moduleRatingUserCount ||
        !moduleReferralSpecialistCount ||
        !moduleSendCouponCount ||
        !moduleSendLinkCount ||
        !moduleTextCount ||
        !moduleTextTitleCount
      ) {
        return next(ApiError.badRequest("Непольные данные"));
      }
      const scenario = await Scenario.findOne({ where: { id } });
      if (scenario) {
        await deleteActionScenario(ChangeStatusAction, scenario.id);
        await deleteActionScenario(ReCallAction, scenario.id);
        await deleteActionScenario(DeleteAction, scenario.id);
        await deleteModuleByScenarioId(ModuleCheckList, scenario.id);
        await deleteModuleByScenarioId(ModuleComment, scenario.id);
        await deleteModuleByScenarioId(ModuleDropdown, scenario.id);
        await deleteModuleByScenarioId(ModuleRatingUser, scenario.id);
        await deleteModuleByScenarioId(ModuleReferralSpecialist, scenario.id);
        await deleteModuleByScenarioId(ModuleSendCoupon, scenario.id);
        await deleteModuleByScenarioId(ModuleSendLink, scenario.id);
        await deleteModuleByScenarioId(ModuleText, scenario.id);
        await deleteModuleByScenarioId(ModuleTextWithTitle, scenario.id);
      }
      let update = {
        fromDate: fromDate ? new Date(fromDate) : null,
        untilDate: untilDate ? new Date(untilDate) : null,
        firstNew: firstNew ? firstNew : null,
        name,
        typeScenarioId,
        notRingUpActionId, 
        notDoneActionId,
        completedActionId,
      };
      const updatedScenario = await Scenario.update(update, { where: { id } });
      
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

      for (let i = 0; i < moduleTextCount; i++) {
        const moduleText = req.body[`moduleText[${i}]`];
        await createModuleText(moduleText, scenario.id);
      }

      for (let i = 0; i < moduleTextTitleCount; i++) {
        const moduleTextTitle = req.body[`moduleTextTitle[${i}]`];
        await createModuleTextTitle(moduleTextTitle, scenario.id);
      }

      for (let i = 0; i < moduleSendLinkCount; i++) {
        const moduleSendLink = req.body[`moduleSendLink[${i}]`];
        await createModuleSendLink(moduleSendLink, scenario.id);
      }

      for (let i = 0; i < moduleSendCouponCount; i++) {
        const moduleSendCoupon = req.body[`moduleSendCoupon[${i}]`];
        await createModuleSendCoupon(moduleSendCoupon, scenario.id);
      }

      for (let i = 0; i < moduleReferralSpecialistCount; i++) {
        const moduleReferralSpecialist =
          req.body[`moduleReferralSpecialist[${i}]`];
        await createModuleReferralSpecialist(
          moduleReferralSpecialist,
          scenario.id
        );
      }

      for (let i = 0; i < moduleRatingUserCount; i++) {
        const moduleRatingUser = req.body[`moduleRatingUser[${i}]`];
        await createModuleRatingUser(moduleRatingUser, scenario.id);
      }

      for (let i = 0; i < moduleDropdownCount; i++) {
        const moduleDropdownCount = req.body[`moduleDropdown[${i}]`];
        await createModuleDropdown(moduleDropdownCount, scenario.id);
      }

      for (let i = 0; i < moduleCommentCount; i++) {
        const moduleComment = req.body[`moduleComment[${i}]`];
        await createModuleComment(moduleComment, scenario.id);
      }

      for (let i = 0; i < moduleCheckListCount; i++) {
        const moduleCheckList = req.body[`moduleCheckList[${i}]`];
        await createModuleChekList(moduleCheckList, scenario.id);
      }
      return res.json(updatedScenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
  async deleteScenario(req, res, next) {
    try {
      const { id } = req.query;
      const scenario = await Scenario.findOne({ where: { id } });
      if (scenario) {
        await deleteActionScenario(ChangeStatusAction, scenario.id);
        await deleteActionScenario(ReCallAction, scenario.id);
        await deleteActionScenario(DeleteAction, scenario.id);
        await deleteModuleByScenarioId(ModuleCheckList, scenario.id);
        await deleteModuleByScenarioId(ModuleComment, scenario.id);
        await deleteModuleByScenarioId(ModuleDropdown, scenario.id);
        await deleteModuleByScenarioId(ModuleRatingUser, scenario.id);
        await deleteModuleByScenarioId(ModuleReferralSpecialist, scenario.id);
        await deleteModuleByScenarioId(ModuleSendCoupon, scenario.id);
        await deleteModuleByScenarioId(ModuleSendLink, scenario.id);
        await deleteModuleByScenarioId(ModuleText, scenario.id);
        await deleteModuleByScenarioId(ModuleTextWithTitle, scenario.id);
        await scenario.destroy();
      }
      return res.json(scenario);
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest(error));
    }
  }
}

module.exports = new ScenarioController();
