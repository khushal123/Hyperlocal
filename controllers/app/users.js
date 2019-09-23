let { registrationValidation, loginValidationEmail, deviceIdValidation }
    = require("../../utils/validations");
let { validationErrorResponse, successResponse } = require("../../utils/response");
let { create, loginEmail, addToCart,
    updateCartProduct, getFullCart, refreshJwt, refreshDeviceToken }
    = require("../../database/app/users")
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

var getCart = (req, res, next) => {
    var userId = req.params.userId;
    getFullCart(userId).then((cart) => {
        successResponse(res, cart)
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

var saveCart = (req, res, next) => {
    console.log("----------------")
    var userId = req.body.userId;
    var productId = req.body.productId;
    var quantity = req.body.quantity;

    if (!productId) {
        return validationErrorResponse(res, "productId is required");
    }
    if (!quantity) {
        return validationErrorResponse(res, "quantity is required");
    }
    addToCart(userId, productId, quantity).then((cart) => {
        successResponse(res, cart)
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}

var updateCart = (req, res, next) => {
    var userId = req.body.userId;
    var productId = req.body.productId;
    var quantity = req.body.quantity;
    if (!productId) {
        return validationErrorResponse(res, "productId is required");
    }
    if (!quantity) {
        return validationErrorResponse(res, "quantity is required");
    }
    updateCartProduct(userId, productId, quantity).then((cart) => {
        successResponse(res, cart)
    }).catch((error) => {
        validationErrorResponse(res, error);
    })
}



module.exports = { register, login, refreshToken, refreshDeviceId, getCart, saveCart, profile, getOrders, updateCart }