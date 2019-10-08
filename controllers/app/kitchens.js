var { kitchenCreateValidation, } = require("../../utils/validations");
var { createKitchen, updateKitchen } = require("./../../database/admin/kitchens")
let { validationErrorResponse, successResponse } = require("../../utils/response");

let create = (req, res, next) => {
    let name = req.body.name;
    let dish_type = req.body.dish_type;
    let address_line_1 = req.body.address_line_1;
    let address_line_2 = req.body.address_line_2;
    let address_line_3 = req.body.address_line_3;
    let lattitude = req.body.lattitude;
    let longitude = req.body.longitude;

    let validationResult = kitchenCreateValidation(req, {
        name: name,
        dish_type: dish_type,
        address_line_1: address_line_1,
        address_line_2: address_line_2
    })
    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    createKitchen({
        name: name,
        dish_type: dish_type,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        address_line_3: address_line_3 ? address_line_3 : "",
        lattitude: lattitude ? lattitude : "",
        longitude: longitude ? longitude : ""
    }).then((kitchen) => {
        successResponse(res, kitchen);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
    successResponse(res, { data: "success" })
}

//get list by location


let getListByLocation = (req, res, next)=>{
    
}


module.exports = { create, update }