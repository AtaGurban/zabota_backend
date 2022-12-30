const {
  ReCallAction,
  DeleteAction,
  ChangeStatus,
} = require("../models/models");

const createRecallAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { unit, count, time, endActionsScenarioId } = parsedObj;
  const recallActionItem = await ReCallAction.create({
    unit,
    count,
    time,
    endActionsScenarioId,
    scenarioId,
  });
  return recallActionItem;
};

const createChangeStatusAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { endActionsScenarioId, typeScenarioId } = parsedObj;
  const changeStatusActionItem = await ChangeStatus.create({
    endActionsScenarioId,
    scenarioId,
    typeScenarioId,
  });
  return changeStatusActionItem;
};

const createDeleteAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { endActionsScenarioId } = parsedObj;
  const deleteActionItem = await DeleteAction.create({
    endActionsScenarioId,
    scenarioId,
  });
  return deleteActionItem;
};

const createModuleTextTitle = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleText = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleSendLink = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleSendCoupon = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleReferralSpecialist = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleRatingUser = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleDropdown = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleComment = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

const createModuleChekList = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
};

module.exports = {
  createRecallAction,
  createChangeStatusAction,
  createDeleteAction,
  createModuleTextTitle,
  createModuleChekList,
  createModuleComment,
  createModuleDropdown,
  createModuleRatingUser,
  createModuleReferralSpecialist,
  createModuleSendCoupon,
  createModuleSendLink,
  createModuleText,
};
