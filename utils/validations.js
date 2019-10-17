var Joi = require("@hapi/joi");
let registrationValidation = (req, body) => {
    const schema = Joi.object({
        full_name: Joi.string().required(),
        email: Joi.string().email({minDomainSegments: 2}),
        password: Joi.string().required(),
        mobile: Joi.number().integer().min(1000000000).max(9999999999)
    });
    const {error, value} = schema.validate({
        full_name: body.full_name,
        email: body.email,
        mobile: body.mobile,
        password: body.password
    });
    return {error, value};
}

let loginValidationEmail = (req, body) => {
    const schema = Joi.object({
        email: Joi.string().email({minDomainSegments: 2}).required(),
        password: Joi.string().required(),
    });
    const {error, value} = schema.validate({
        email: body.email,
        password: body.password
    });
    return {error, value};
}

let loginValidationMobile = (body) => {
    const schema = Joi.object({
        mobile: Joi.number().min(10).max(10)
    });
    const {error, value} = schema.validate({
        mobile: body.mobile
    });
    return {error, value};
}
let loginValidationOtp = (body) => {
    const schema = Joi.object({
        otp: Joi.number().required()
    });
    const {error, value} = schema.validate({});
    return {error, value};
}
let kitchenCreateValidation = (res, body) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        dish_type: Joi.string().required(),
        address_line_1: Joi.string().required(),
        address_line_2: Joi.string().required(),
        lattitude: Joi.string().required(),
        longitude: Joi.string().required()
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}

var discountValidation = (body) => {
    const schema = Joi.object({
        discount_type: Joi.string().required(),
        minimum_value: Joi.number().required(),
        discount_value: Joi.string().required(),
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}

var paymentValidation = (body) => {
    const schema = Joi.object({
        payment_type: Joi.string().required(),
        amount: Joi.number().required(),
        transaction_id: Joi.string().required()
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}

var cartCheckoutValidation = (body) => {
    const schema = Joi.object({
        payment_id: Joi.number().required(),
        user_id: Joi.number().required(),
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}
var singleCheckoutValidation = (body) => {
    const schema = Joi.object({
        payment_id: Joi.number().required(),
        product_id: Joi.number().required(),
        user_id: Joi.number().required(),
        quantity: Joi.number().required(),
        discount_id: Joi.number().require()
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}
var deviceIdValidation = (body) => {
    const schema = Joi.object({
        device_id: Joi.string().required(),
        user_id: Joi.number().required(),
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}
let getKitchenListValidation = (body) => {
    const schema = Joi.object({
        device_id: Joi.string().required(),
        user_id: Joi.number().required(),
    });
    const {error, value} = schema.validate(body);
    return {error, value};
}

module.exports = {
    singleCheckoutValidation,
    deviceIdValidation,
    cartCheckoutValidation,
    registrationValidation, loginValidationEmail,
    loginValidationMobile, loginValidationOtp, kitchenCreateValidation, discountValidation, paymentValidation
}
