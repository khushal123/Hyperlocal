var models = require("../../models");
var payments = models.payments;

let savePayment = async (body) => {
    try {
        let payment = await payments.create(body);
        return payment;
    } catch (error) {
        return error;
    }
}


module.exports = { savePayment }