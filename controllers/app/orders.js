var { singleCheckoutValidation, cartCheckoutValidation } = require("../../utils/validations");
var { checkoutCart, checkoutSingle } = require("./../../database/app/orders");
let { validationErrorResponse, successResponse } = require("../../utils/response");

let saveSingle = (req, res, next) => {
    let validation = singleCheckoutValidation(req.body);
    if (validation.error) {
        return validationErrorResponse(res, validation.error);
    }
    checkoutSingle(req.body).then((result) => {
        successResponse(res, result);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}
let saveCart = (req, res, next) => {
    let validation = singleCheckoutValidation(req.body);
    if (validation.error) {
        return validationErrorResponse(res, validation.error);
    }
    checkoutCart(req.body).then((result) => {
        successResponse(res, result);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

let getOrder = (req, res, next) => {

}



module.exports = { saveSingle, saveCart, getOrder }