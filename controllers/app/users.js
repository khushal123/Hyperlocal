let {registrationValidation, loginValidationEmail, deviceIdValidation, loginValidationMobile}
    = require("../../utils/validations");
let {validationErrorResponse, successResponse} = require("../../utils/response");
let {
    create, loginEmail, addToCart,
    getForHome,
    updateCartProduct, getFullCart, refreshJwt, refreshDeviceToken, updateOtpByUsername, verifyOtpByUsername
}
    = require("../../database/common/users")
let {generateToken} = require("../../utils/token");
let {userTypes} = require("../../utils/constants")
let {generateHash, compareHash} = require("../../utils/bcrypt");

var {sendOtp} = require("../../utils/api");

let homePage = async (req, res, next) => {
    console.log("homepage")
    let bannerLinks= [
        { image: "https://dummyimage.com/600x400/000/fff" },
        { image: "https://dummyimage.com/600x400/000/fff" },
        { image: "https://dummyimage.com/600x400/000/fff" },
    ]
    let result = await getForHome(req.body. latitude, req.body.longitude);
    let response = {
        banners:bannerLinks,
        restaurants:result
    }
    successResponse(res, response);
}

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
        return create(full_name, email, hash, mobile, userTypes.app_user)
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


let getOtp = async (req, res, next) => {
    let username = req.body.username;
    try {
        let user = await updateOtpByUsername(username);
        console.log(user)
        let send = await sendOtp(user.mobile,
            user.otp, user.email);
        return successResponse(res, {otp: user.otp})
    } catch (error) {
        console.log(error);
        return validationErrorResponse(res, error)
    }

}

let verifyOtp = async (req, res, next) => {
    let otp = req.body.otp;
    let username = req.body.username;
    try {
        let user = await verifyOtpByUsername(username, otp);
        console.log(user.id)
        let token = await generateToken(user.id);
        console.log(token);
        return successResponse(res, {
            message: "otp verified succesfully",
            token: token
        })
    } catch (error) {
        console.log(error)
        return validationErrorResponse(res, {message: "Otp validation failed"})
    }
}


module.exports = {
    homePage,
    loginMobile,
    register,
    getOtp,
    verifyOtp,
    login,
    refreshToken,
    refreshDeviceId,
    getCart, saveCart, profile, getOrders, updateCart
}