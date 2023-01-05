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
  Scenario,
  Deal,
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

const deleteActionScenario = async (model, scenarioId)=>{
  if (model && id){
    const deletedItem = await model.findAll({where:{scenarioId}})
    if (deletedItem.length > 0){
      deletedItem.map(async (i)=>{
        await i.destroy()
      })
    }
  }
}

const deleteModuleByScenarioId = async(scenarioId, model)=>{
  const modules = await model.findAll({where:{scenarioId}})
  if (modules.length > 0){
    modules.map( async(i)=> {
      if (model === ModuleDropdown){
        await deleteDropdownItems(i.id)
      } else if (model === ModuleCheckList){
        await deleteCheckListItems(i.id)
      }
      await i.destroy()
    })
  }
}

const deleteModuleById = async(id, model)=>{
  const module = await model.findOne({where:{id}})
  if (module){
    await module.destroy()
  }
}

const deleteDropdownItems = async (moduleDropdownId)=>{
  if (moduleDropdownId){
    const allItems = await ModuleDropdownItems.findAll({where:{moduleDropdownId}})
    allItems.map(async (i)=> await i.destroy())
  }
}

const deleteCheckListItems = async (moduleCheckListId )=>{
  if (moduleCheckListId){
    const allItems = await ModuleCheckListItems.findAll({where:{moduleCheckListId}})
    allItems.map(async (i)=> await i.destroy())
  }
}

const deleteScenarioBytypeScenarioId = async (typeScenarioId)=>{
  if (typeScenarioId){
    const allScenarios = await Scenario.findAll({where:{typeScenarioId}})
    allScenarios.map(async (i)=> {
      await deleteActionScenario(ChangeStatusAction, i.id)
      await deleteActionScenario(ReCallAction, i.id)
      await deleteActionScenario(DeleteAction, i.id)
      await deleteModuleByScenarioId(ModuleCheckList, i.id)
      await deleteModuleByScenarioId(ModuleComment, i.id)
      await deleteModuleByScenarioId(ModuleDropdown, i.id)
      await deleteModuleByScenarioId(ModuleRatingUser, i.id)
      await deleteModuleByScenarioId(ModuleReferralSpecialist, i.id)
      await deleteModuleByScenarioId(ModuleSendCoupon, i.id)
      await deleteModuleByScenarioId(ModuleSendLink, i.id)
      await deleteModuleByScenarioId(ModuleText, i.id)
      await deleteModuleByScenarioId(ModuleTextWithTitle, i.id)
      await i.destroy()
    })
  }
}

const changeTypeScenario = async (id, typeScenario)=>{
  const deals = await Deal.findAll({where:{typeScenarioId: id}})
  deals.map( async(i)=>{
    await Deal.update({typeScenarioId: typeScenario}, {where: {id: i.id}})
  })
}

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
  deleteActionScenario,
  deleteModuleByScenarioId,
  deleteModuleById,
  deleteScenarioBytypeScenarioId,
  changeTypeScenario
};
