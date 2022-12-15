const { default: axios } = require("axios");
const { Manager } = require("../models/models");

const statusUrl= 'https://nerielt.app/api/agents?token=709B0D21504685B87D27ADD360FA12E6'
const getManager = async(status)=>{
    try {
        const { data } = await axios.get(statusUrl);
        if (status === 'start'){
            data.data.map(async (i)=>{
                await Manager.create({
                    manager_id: i.manager_id,
                    manager_name: i.manager_name,
                    manager_phone: i.manager_phone,
                    manager_email: i.manager_email,
                    manager_position: i.manager_position
                })
            }) 
        } else{
            data.data.map(async(i)=>{
                const checkOneManager = await Manager.findOne({ where: {manager_id: i.manager_id}})
                if (!checkOneManager){
                    await Manager.create({
                        manager_id: i.manager_id,
                        manager_name: i.manager_name,
                        manager_phone: i.manager_phone,
                        manager_email: i.manager_email,
                        manager_position: i.manager_position
                    })
                }
            })
        }
        return true
    } catch (error) {
        return error
    }

}


module.exports = {
    getManager
}
