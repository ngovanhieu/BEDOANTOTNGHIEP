const Joi = require("joi");
const errorFunction = require('../utils/errorFunction')

// const patternPassword = /^[a-zA-Z0-9]{5,30}$/
const patternPhoneNumber = /[0]{1}[0-9]{9}/

const validation = Joi.object({
    productId: Joi.string().required(),
    productName: Joi.string().min(5).max(30).required(),
    productBrand: Joi.string().min(5).max(30),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
    type: Joi.string().max(100).required(),
    images: Joi.string().allow(""),
    userId: Joi.string().required(),
    userName: Joi.string().min(5).max(30).required(),
    phone: Joi.string().required(),
    address: Joi.string().max(200).required().allow(""), 
    orderStatus: Joi.number().required(),
})

const orderValidation = async (req, res, next) => {
   

    const { error } = validation.validate(req.body)
    if (error) {
        res.status(406)
        return res.json(
            errorFunction(true, `Error in User Data: ${error.message}`),
        )
    } else {
        next()
    }
}
module.exports = orderValidation

