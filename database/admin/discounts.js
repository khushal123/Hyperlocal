var models = require("../../models")
var discounts = models.discounts;

var createDiscount = async (body) => {
    try {
        var discount = await discounts.create(body);
        return discount;
    } catch (error) {

    }
}

var getDiscountList = async () => {
    try {
        var discounts = await discounts.findAll({
            where: {
                status: 1
            }
        })
        return discounts;
    } catch (error) {
        return error;
    }
}

module.exports = { createDiscount, getDiscountList }