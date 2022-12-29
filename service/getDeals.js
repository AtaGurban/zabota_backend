const { default: axios } = require("axios");
const moment = require("moment/moment");
const { Deal, TypeScenario } = require("../models/models");

const urlDeals = 'https://nerielt.app/api/deals?token=709B0D21504685B87D27ADD360FA12E6' 
const dateOffset = (26 * 60 * 60 * 1000)
let myDate = new Date();
myDate.setTime(myDate.getTime() - dateOffset);
let dateForFilteer = moment.utc(myDate).format()
const urlDealsWithFilteer = `https://nerielt.app/api/deals?token=709B0D21504685B87D27ADD360FA12E6&&params={"filter":{"date":{"min":"${dateForFilteer}"}}}`

const getDeals = async(state)=>{
    const typeScenarioList = await TypeScenario.findAll()
    try {
        if (state === 'start'){
            const { data } = await axios.get(urlDeals);
            data.data.map(async (i)=>{
                if (i.status_id === 6){
                    const typeScenarioId = (typeScenarioList.filter(i => i.name === 'Закрытые клиенты'))[0].id
                    await Deal.create({
                        deal_id: i.deal_id,
                        price: i.price,
                        price_second: i.price_second,
                        status_id: i.status_id,
                        manager_id: i.manager_id,
                        second_manager_id: i.second_manager_id,
                        lawyer_id: i.lawyer_id,
                        broker_id: i.broker_id,
                        client_id: i.client_id,
                        comment: i.comment,
                        abc_status: i.abc_status,
                        complete: i.complete,
                        deleted: i.deleted,
                        typeScenarioId
                    })
                } else if (i.deleted){
                    const typeScenarioId = (typeScenarioList.filter(i => i.name === 'Неуспешные клиенты'))[0].id
                    await Deal.create({
                        deal_id: i.deal_id,
                        price: i.price,
                        price_second: i.price_second,
                        status_id: i.status_id,
                        manager_id: i.manager_id,
                        second_manager_id: i.second_manager_id,
                        lawyer_id: i.lawyer_id,
                        broker_id: i.broker_id,
                        client_id: i.client_id,
                        comment: i.comment,
                        abc_status: i.abc_status,
                        complete: i.complete,
                        deleted: i.deleted,
                        typeScenarioId
                    })
                }
            })
        } else {
            const { data } = await axios.get(urlDealsWithFilteer);
            data.data.map(async (i)=>{
                if (i.status_id === 6){
                    const typeScenarioId = (typeScenarioList.filter(i => i.name === 'Закрытые клиенты'))[0].id
                    const checkOneContact = await Deal.findOne({ where: {deal_id: i.deal_id}})
                    if (!checkOneContact){
                        await Deal.create({
                            deal_id: i.deal_id,
                            price: i.price,
                            price_second: i.price_second, 
                            status_id: i.status_id,
                            manager_id: i.manager_id,
                            second_manager_id: i.second_manager_id,
                            lawyer_id: i.lawyer_id,
                            broker_id: i.broker_id,
                            client_id: i.client_id,
                            comment: i.comment,
                            abc_status: i.abc_status,
                            complete: i.complete,
                            deleted: i.deleted,
                            typeScenarioId
                        })
                    }
                } else if (i.deleted){
                    const checkOneContact = await Deal.findOne({ where: {deal_id: i.deal_id}})
                    const typeScenarioId = (typeScenarioList.filter(i => i.name === 'Неуспешные клиенты'))[0].id
                    if (!checkOneContact){
                        await Deal.create({
                            deal_id: i.deal_id,
                            price: i.price,
                            price_second: i.price_second, 
                            status_id: i.status_id,
                            manager_id: i.manager_id,
                            second_manager_id: i.second_manager_id,
                            lawyer_id: i.lawyer_id,
                            broker_id: i.broker_id,
                            client_id: i.client_id,
                            comment: i.comment,
                            abc_status: i.abc_status,
                            complete: i.complete,
                            deleted: i.deleted,
                            typeScenarioId 
                        })
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
        return error 
    }

}


module.exports = {
    getDeals
}