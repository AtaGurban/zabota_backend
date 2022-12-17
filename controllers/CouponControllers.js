const ApiError = require("../error/ApiError");
const { Сoupon } = require("../models/models");
const uuid = require("uuid");
const fs = require("fs");
const path = require("path"); 

class CouponController {
    async create(req, res, next) { 
        try {
            let {title, description, contacts, count, limited} = req.body
            const img = req.files?.img
            if (!title || !description || !contacts || !img){
                return next(ApiError.badRequest('Непольные данные'))
            }
            const checkCoupon = await Сoupon.findOne({where: {title}})
            if (checkCoupon){
                return next(ApiError.badRequest('Такой купон уже существует'))
            }
            if (!count){
                count = 0
            }
            let imgName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "files", "images", imgName));
            const coupon = await Сoupon.create({
                title,
                description,
                contacts,
                count,
                limited,
                img: imgName
            })
            return res.json(coupon)
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error))
        }

    }
}

module.exports = new CouponController()