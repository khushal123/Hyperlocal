let models = require("../../models");
let users = models.users;
let users_device_token = models.users_device_token;
let users_cart = models.users_cart;
const Op = models.Sequelize.Op;
console.log(users);
let create = async (full_name, email, password, mobile, type) => {
    try {
        console.log(typeof users);
        let getUser = await users.findAll({
            where: {
                [Op.or]: {
                    email: email,
                    mobile: mobile
                }
            }
        })
        console.log("got user");
        console.log("----------getuser-----------");
        console.log(getUser);
        console.log("----------getuser-----------");
        if (getUser && getUser.length > 0) {
            return Promise.reject({
                message: "user exists"
            });
        }
        let createUser = await users.create({
            name: full_name,
            email: email,
            password: password,
            mobile: mobile,
            status: 1,
            user_type: type,
            login_status: 0 //
        }, {
            plane: true
        });
        console.log("----------createUser-----------");
        console.log(createUser);
        console.log("----------createUser-----------");
        return createUser;
    } catch (error) {
        console.log("----------error-----------");
        console.log(error);
        console.log("----------error-----------");
        return Promise.reject({
            message: error.original.sql,
            stack: "database/user.js/39"
        });
    }

}

let loginEmail = async (email) => {
    try {
        let getUser = await users.findOne({
            where: {
                email: email
            }
        })
        console.log("got user");
        console.log("----------getuser-----------");
        console.log(getUser);
        console.log("----------getuser-----------");
        if (getUser === null) {
            return Promise.reject({
                message: "No user found"
            });
        }
        return getUser;
    }
    catch (error) {
        console.log(error)
        return Promise.reject(error)
    }


}

let loginMobile = (mobile) => {
    try {
        let getUser = await users.findOne({
            where: {
                mobile: mobile
            }
        })
        console.log("got user");
        console.log("----------getuser-----------");
        console.log(getUser);
        console.log("----------getuser-----------");
        if (getUser === null) {
            return Promise.reject({
                message: "No user found"
            });
        }
        return getUser;
    }
    catch (error) {
        console.log(error)
        return Promise.reject(error)
    }
}

let updateOtpByUsername = async (username) => {
    try {
        let otp = Math.floor(100000 + Math.random() * 900000);
        let updateOtp = await user.update({
            otp: otp
        }, {
            where: {
                [Op.or]: {
                    email: username,
                    mobile: username
                }
            }
        })
        let user = await user.findOne({
            where: {
                [Op.or]: {
                    email: username,
                    mobile: username
                }
            }
        });
        return user;
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}



let verifyOtpByUsername = async (username, otp) => {
    try {
        let user = await user.update({
            otp_verified: 1
        }, {
            where: {
                [Op.or]: {
                    email: username,
                    mobile: username
                },
                otp: otp
            }
        })
        return user;
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}

let refreshJwt = async (email, password) => {
    return loginEmail(email, password)
}
let refreshDeviceToken = async (body) => {
    try {
        console.log(body)

        var user = await users_device_token.findOne({
            where: {
                user_id: body.user_id
            },
            raw: true
        })
        var updateDeviceId = {}
        console.log(user);
        if (user) {
            updateDeviceId = await users_device_token.update(body, {
                where: {
                    user_id: body.user_id
                }
            })
        } else {
            updateDeviceId = await users_device_token.create(body);
        }
        console.log("-----------------");
        console.log(updateDeviceId);
        console.log("-----------------");
        return updateDeviceId;
    } catch (error) {
        console.log(error)
        return error;
    }
}

let getUserInfo = () => {

}

let updateUserInfo = () => {

}

let getFullCart = async (userId) => {
    try {
        var cart = await users_cart.findAll({
            where: {
                user_id: userId
            }
        });
        return cart
    } catch (error) {
        return error;
    }
}

let addToCart = async (userId, productId, quantity) => {
    try {
        let cart = await users_cart.create({
            product_id: productId,
            quantity: quantity,
            user_id: userId
        });
        return cart;
    } catch (error) {
        return error;
    }
}

let updateCartProduct = (userId, productId, quantity) => {
    try {
        let cart = users_cart.update({
            quantity: quantity
        }, {
            where: {
                user_id: userId,
                product_id: productId
            },
            new: true
        })
        return cart;
    } catch (error) {
        return error;
    }
}
let deleteCartProduct = (userId, productId) => {
    try {
        let cart = users_cart.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        })
        return cart;
    } catch (error) {
        return error;
    }
}

let deleteAllCart = (userId) => {
    try {
        let cart = users_cart.destroy({
            where: {
                user_id: userId,
            }
        })
        return cart;
    } catch (error) {
        return error;
    }
}


module.exports = {
    updateOtpByUsername,
    verifyOtpByUsername,
    refreshDeviceToken,
    refreshJwt,
    create, loginEmail, loginMobile,
    getUserInfo, updateUserInfo, getFullCart, addToCart, updateCartProduct, deleteCartProduct, deleteAllCart
}
