const { default: axios } = require("axios");
const { Contact, Deal } = require("../models/models");

const url = 'https://nerielt.app/api/contacts?token=709B0D21504685B87D27ADD360FA12E6&full=1'

const getContacts = async(state)=>{
    try {
        const { data } = await axios.get(url);
        if (state === 'start'){
            for (const key in data.data) {
                if (Object.hasOwnProperty.call(data.data, key)) {
                    const i = data.data[key];
                    const deal = await Deal.findOne({where:{client_id: i.id}})
                    await Contact.create({
                        contact_id: i.id,
                        contact_name: i.name,
                        contact_phone: i.phone,
                        contact_phone_two: i.phone_two,
                        contact_email: i.email,
                        contact_type: i.contact_type,
                        birthdate: i.birthdate?.date, 
                        manager_id: i.manager_id,
                        dealId: deal?.id
                    })
                }
            }
        } else {
            for (const key in data.data) {
                if (Object.hasOwnProperty.call(data.data, key)) {
                    const i = data.data[key];
                    const checkOneContact = await Contact.findOne({ where: {contact_id: i.id}})
                    if (!checkOneContact){
                        const deal = await Deal.findOne({where:{client_id: i.id}})
                        await Contact.create({
                            contact_id: i.id,
                            contact_name: i.name,
                            contact_phone: i.phone,
                            contact_phone_two: i.phone_two,
                            contact_email: i.email,
                            contact_type: i.contact_type,
                            birthdate: i.birthdate?.date, 
                            manager_id: i.manager_id,
                            dealId: deal?.id
                        })
                    }
                }
            }
        }
        return data
    } catch (error) {
        console.log(error);
        return error 
    }

}


module.exports = {
    getContacts
}