var { paymentValidation } = require("../../utils/validations");
var { savePayment } = require("./../../database/app/payments");
let { validationErrorResponse, successResponse } = require("../../utils/response");

let save = async (req, res, next) => {
    var validation = paymentValidation(req.body);
    if (validation.error) {
        return validationErrorResponse(res, validation.error);
    }
    try {
        var payment = await savePayment(req.body);
        return successResponse(res, payment);
    } catch (error) {
        return validationErrorResponse(res, error);
    }
}

module.exports = { save }