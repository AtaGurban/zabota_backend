const {
  ReCallAction,
  DeleteAction,
  ModuleText,
  ModuleTextWithTitle,
  ModuleSendLink,
  ModuleReferralSpecialist,
  ModuleRatingUser,
  ModuleComment,
  ModuleSendCoupon,
  ModuleDropdown,
  ModuleDropdownItems,
  ModuleCheckList,
  ModuleCheckListItems,
  ChangeStatusAction,
} = require("../models/models");

const createRecallAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { unit, count, time, eventForAction} = parsedObj;
  const recallActionItem = await ReCallAction.create({
    unit,
    count,
    time,
    eventForAction,
    scenarioId,
  }); 
  return recallActionItem;
};

const createChangeStatusAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { eventForAction, typeScenarioId } = parsedObj;
  const changeStatusActionItem = await ChangeStatusAction.create({
    eventForAction,
    scenarioId,
    typeScenarioId,
  });
  return changeStatusActionItem;
};

const createDeleteAction = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { eventForAction } = parsedObj;
  const deleteActionItem = await DeleteAction.create({
    eventForAction,
    scenarioId,
  });
  return deleteActionItem;
};

const createModuleTextTitle = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number, text, title } = parsedObj;
  const moduleTextWithTitleItem = await ModuleTextWithTitle.create({
    number, text, scenarioId, title
  })
  return moduleTextWithTitleItem
};

const createModuleText = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number, text } = parsedObj;
  const moduleTextItem = await ModuleText.create({
    number, text, scenarioId
  })
  return moduleTextItem
};

const createModuleSendLink = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number } = parsedObj;
  const moduleSendLinkItem = await ModuleSendLink.create({
    number, scenarioId 
  })
  return moduleSendLinkItem
};

const createModuleSendCoupon = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number } = parsedObj;
  const moduleSendCouponItem = await ModuleSendCoupon.create({
    number, scenarioId
  })
  return moduleSendCouponItem

};

const createModuleReferralSpecialist = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number } = parsedObj;
  const moduleReferralSpecItem = await ModuleReferralSpecialist.create({
    number, scenarioId
  })
  return moduleReferralSpecItem
};

const createModuleRatingUser = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number } = parsedObj;
  const moduleRatingUserItem = await ModuleRatingUser.create({
    number, scenarioId
  })
  return moduleRatingUserItem
};

const createModuleDropdown = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number, name, dropdownItems } = parsedObj;
  const moduleDropdownItem = await ModuleDropdown.create({
    number, scenarioId, name
  })
  dropdownItems.map(async(i)=>{
    const {number, itemName} = i
    const dropdownItem = await ModuleDropdownItems.create({
      number, itemName, moduleDropdownId:moduleDropdownItem.id
    })
  })
  return moduleDropdownItem
};

const createModuleComment = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number, text, title } = parsedObj;
  const moduleCommentItem = await ModuleComment.create({
    number, text, scenarioId, title
  })
  return moduleCommentItem
};

const createModuleChekList = async (item, scenarioId) => {
  const parsedObj = JSON.parse(item);
  const { number, checkListItems } = parsedObj;
  const moduleCheckListItem = await ModuleCheckList.create({
    number, scenarioId
  })
  checkListItems.map(async(i)=>{
    const {number, text} = i
    const checkListItem = await ModuleCheckListItems.create({
      number, text, moduleCheckListId:moduleCheckListItem.id
    })
  })
  return moduleCheckListItem
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
