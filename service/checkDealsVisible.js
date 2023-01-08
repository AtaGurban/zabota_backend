const { Op } = require("sequelize");
const { Deal } = require("../models/models");

const checkVisibleDeal = async () => {
  const dealsForCheck = await Deal.findAll({
    where: {
      unvisibleUntilDate: {
        [Op.not]: null, 
      },
    },
  });
  let now = +new Date()
  for (let i = 0; i < dealsForCheck.length; i++) {
    const deal = dealsForCheck[i]
    const dealDate = +new Date(dealsForCheck[i]?.unvisibleUntilDate);
    if (now > dealDate){
        let update = {unvisibleUntilDate: null}
        await Deal.update(update, {where:{id:deal.id}})
    }
  }
};

module.exports = {
  checkVisibleDeal,
};
