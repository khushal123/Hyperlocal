let { registrationValidation, loginValidationEmail } = require("../../utils/validations");
let { validationErrorResponse, successResponse } = require("../../utils/response");
let { create, loginEmail } = require("../../database/app/users");
let { generateToken } = require("../../utils/token");


var register = (req, res, next) => {
    let email = req.body.email;
    let full_name = req.body.full_name;
    let password = req.body.password;
    let mobile = req.body.mobile;
    console.log(req.body.mobile.length);
    let validationResult = registrationValidation(req, {
        email: email,
        full_name: full_name,
        password: password,
        mobile: mobile
    })

    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    create(full_name, email, password, mobile).then((result) => {
        successResponse(res, result);
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    })

}

var login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    let validationResult = loginValidationEmail(req, {
        email: email,
        password: password,
    })

    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    var user = {}
    loginEmail(email, password).then((result) => {
        user = result;
        return generateToken(result.id);
    }).then((token) => {
        user.token = token;
        successResponse(res, user);
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    });

}
var loginMobile = (req, res, next) => {

}

var refreshToken = (req, res, next) => {

}

var refreshDeviceId = (req, res, next) => {

}



var profile = (req, res, next) => {

}

var getOrders = (req, res, next) => {

}




module.exports = { register, login, refreshToken, refreshDeviceId, profile, getOrders }