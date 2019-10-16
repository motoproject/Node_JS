const Joi = require('@hapi/joi');

const registerValidation = (reqBody) =>{

    let userRegistrationValidation = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(reqBody, userRegistrationValidation);
}

const loginValidation = (reqBody) =>{

    let userloginValidation = {
        email: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(reqBody, userloginValidation);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;