const { default: axios } = require("axios");
const { Status } = require("../models/models");

const statusUrl= 'https://nerielt.app/api/deal_statuses?token=709B0D21504685B87D27ADD360FA12E6'
const getStatus = async()=>{
    try {
        const { data } = await axios.get(statusUrl);
        data.data.map(async (i)=>{
            await Status.create({
                status_id: i.status_id,
                status_name: i.status_name
            })
        })
        return data
    } catch (error) {
        return error
    }

}


module.exports = {
    getStatus
}
