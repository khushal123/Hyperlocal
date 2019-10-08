let models = require("../../models");
let users = models.users;
let users_device_token = models.users_device_token;
const Op = models.Sequelize.Op;
console.log(users);
let create = async (full_name, email, password, mobile) => {
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
            user_type: "delivery",
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

let loginEmail = async (email, password) => {
    try {
        let getUser = await users.findOne({
            where: {
                email: email,
                password: password
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




module.exports = {
    refreshDeviceToken,
    refreshJwt,
    create, loginEmail, loginMobile,
    getUserInfo, updateUserInfo
}