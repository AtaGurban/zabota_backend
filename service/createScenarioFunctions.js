const { ReCallAction, DeleteAction, ChangeStatus } = require("../models/models")

const createRecallAction = async (item, scenarioId)=>{
    const parsedObj = JSON.parse(item)
    const {unit, count, time, endActionsScenarioId} = parsedObj
    const recallActionItem = await ReCallAction.create({
        unit, count, time, endActionsScenarioId, scenarioId
    })
    return recallActionItem
}

const createChangeStatusAction = async (item, scenarioId)=>{
    const parsedObj = JSON.parse(item)
    const {endActionsScenarioId, typeScenarioId} = parsedObj
    const changeStatusActionItem = await ChangeStatus.create({
        endActionsScenarioId, scenarioId, typeScenarioId
    })
    return changeStatusActionItem
}

const createDeleteAction = async (item, scenarioId)=>{	
    const parsedObj = JSON.parse(item)
    const {endActionsScenarioId} = parsedObj
    const deleteActionItem = await DeleteAction.create({
        endActionsScenarioId, scenarioId
    })
    return deleteActionItem
}

const createModuleTextTitles = async (item, scenarioId)=>{

}


module.exports = {
    createRecallAction, createChangeStatusAction, createDeleteAction, createModuleTextTitles
}