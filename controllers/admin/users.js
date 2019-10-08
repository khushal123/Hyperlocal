let { registrationValidation, loginValidationEmail } = require("../../utils/validations");
let { validationErrorResponse, successResponse } = require("../../utils/response");
let { create, loginEmail } = require("../../database/common/users");
let { generateToken } = require("../../utils/token");
let { userTypes } = require("../../utils/constants");
let { generateHash, compareHash } = require("../../utils/bcrypt");


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
    generateHash(password).then((hash) => {
        return create(full_name, email, hash, mobile, userTypes.admin);
    }).then((result) => {
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
    loginEmail(email).then((result) => {
        user = result;
        return compareHash(password, user.password)
    }).then((hash) => {
        return generateToken(user.id);
    }).then((token) => {
        user.token = token;
        successResponse(res, user);
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    });

}
var loginMobile = (req, res, next) => {
    let mobile = req.body.mobile;
    let password = req.body.password;
    let validationResult = loginValidationMobile(req, {
        mobile: mobile
    })

    if (validationResult.error) {
        validationErrorResponse(res, validationResult.error.details);
        return;
    }
    loginMobile(mobile).then((result) => {
        user = result;
        return compareHash(password, user.password)
    }).then((hash) => {
        return generateToken(user.id);
    }).then((token) => {
        user.token = token;
        successResponse(res, user);
    }).catch((error) => {
        console.log(error);
        validationErrorResponse(res, error);
    });
}

var refreshToken = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let validationResult = loginValidationEmail(req, {
        email: email,
        password: password,
    })
    console.log(email)
    if (validationResult.error) {
        return validationErrorResponse(res, validationResult.error.details);
    }
    refreshJwt(email, password).then((result) => {
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

var refreshDeviceId = (req, res, next) => {
    let validation = deviceIdValidation(req.body)
    if (validation.error) {
        return validationErrorResponse(res, validation.error.details);
    }
    refreshDeviceToken(req.body).then((deviceId) => {
        successResponse(res, deviceId);
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}



var profile = (req, res, next) => {

}

var getOrders = (req, res, next) => {

}




module.exports = { register, login, refreshToken, refreshDeviceId, profile, getOrders, loginMobile }