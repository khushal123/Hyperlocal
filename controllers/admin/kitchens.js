var {kitchenCreateValidation} = require("../../utils/validations");
var {createKitchen, updateKitchen} = require("./../../database/admin/kitchens")
let {validationErrorResponse, successResponse} = require("../../utils/response");

let create = (req, res, next) => {
    let name = req.body.name;
    let dish_type = req.body.dish_type;
    let address_line_1 = req.body.address_line_1;
    let address_line_2 = req.body.address_line_2;
    let address_line_3 = req.body.address_line_3;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    let validationResult = kitchenCreateValidation(req, {
        name: name,
        dish_type: dish_type,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        latitude: latitude,
        longitude: longitude
    })
    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    let point = { type: 'Point', coordinates: [latitude, longitude]};

    createKitchen({
        name: name,
        dish_type: dish_type,
        address_line_1: address_line_1,
        address_line_2: address_line_2,
        address_line_3: address_line_3 ? address_line_3 : "",
        latitude: latitude ? latitude : "",
        longitude: longitude ? longitude : "",
        location: point,
        status: 0 //closed
    }).then((kitchen) => {
        successResponse(res, kitchen);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

//will add more explaination
let update = (req, res, next) => {
    var id = req.params.id;
    if (!id) {
        validationErrorResponse(res, {message: "id is required"});
        return;
    }
    updateKitchen.then(req.body, id).then((kitchen) => {
        successResponse(res, kitchen);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}


module.exports = {create, update}