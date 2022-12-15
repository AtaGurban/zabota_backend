const { default: axios } = require("axios");

const urlDeals = 'https://nerielt.app/api/deals?token=709B0D21504685B87D27ADD360FA12E6'
const urlDealsWithFilteer = 'https://nerielt.app/api/deals?token=709B0D21504685B87D27ADD360FA12E6&&params={"filter":{"date":{"min":"2022-12-01 00:00:00","max":"2022-12-10 23:59:59"}}}'

const getDeals = async(state)=>{
    try {
        const { data } = await axios.get(urlDeals);
        console.log(data.data[0]);
        if (state === 'start'){
            data.data.map(async (i)=>{
                await Contact.create({
                    contact_id: i.id,
                    contact_name: i.name,
                    contact_phone: i.phone,
                    contact_email: i.email,
                    manager_id: i.manager_id
                })
            })
        } else {
            data.data.map(async (i)=>{
                const checkOneContact = await Contact.findOne({ where: {contact_id: i.id}})
                if (!checkOneContact){
                    await Contact.create({
                        contact_id: i.id,
                        contact_name: i.name,
                        contact_phone: i.phone,
                        contact_email: i.email,
                        manager_id: i.manager_id
                    })
                }
            })
        }
        return data
    } catch (error) {
        console.log(error);
        return error 
    }

}


module.exports = {
    getDeals
}