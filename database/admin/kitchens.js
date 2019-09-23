var models = require("../../models")
var restaurants = models.restaurants;

let createKitchen = async (body) => {
    try {
        let createRst = await restaurants.create(body, {
            plane: true
        });
        console.log("----------createRst-----------");
        console.log(createRst);
        console.log("----------createRst-----------");
        return createRst;
    } catch (error) {
        console.log("----------error-----------");
        console.log(error);
        console.log("----------error-----------");
        return Promise.reject({
            message: error.original.sql,
            stack: "database/kitchens.js/19"
        });
    }
}
let updateKitchen = async (body, id) => {
    try {
        let updateRst = restaurants.update(
            body,
            {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            }
        )
        return updateRst;
    } catch (error) {
        console.log("----------error-----------");
        console.log(error);
        console.log("----------error-----------");
        return Promise.reject({
            message: error,
            stack: "database/kitchens.js/29"
        });
    }
}

let getList = async (body) => {
    try {
        var kitchens = await restaurants.findAll({
            where: {
                status: 1
            }
        })
        return kitchens;
    } catch (error) {
        console.error(error);
        return error;
    }
}

module.exports = { createKitchen, updateKitchen, getList }