let { validationErrorResponse, successResponse } = require("../../utils/response");
let { getDiscountList, createDiscount } = require("../../database/admin/discounts")
let { discountValidation } = require("../../utils/validations");
let getList = (req, res, next) => {
    getDiscountList().then((discountList) => {
        successResponse(res, discountList)
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

let create = (req, res, next) => {
    var body = {
        discount_type: req.body.discount_type,
        minimum_value: req.body.minimum_value,
        discount_value: discount_value,
    }
    var validationResult = discountValidation(body);
    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    body.status = 1
    createDiscount(body).then((discount) => {
        successResponse(res, discount);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

module.exports = { getList, create }