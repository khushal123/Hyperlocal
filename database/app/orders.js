var models = require("../../models");
var orders = models.orders;

let checkoutSingle = async (body) => {
    try {
        var order = await orders.create(body);
        return order;
    } catch (error) {
        return error;
    }
}

let checkoutCart = (user_id) => {

}

module.exports = { checkoutSingle, checkoutCart }